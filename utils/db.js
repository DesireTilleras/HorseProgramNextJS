const { Database, aql } = require("arangojs");

const getConnection = () => {
  // establish database connection
  return new Database({
    url: "http://localhost:8529/",
    databaseName: "_system",
    auth: { username: "root", password: "" },

  }, 
  ()=> console.log("Hejsan"));
};

// function to get collection or create it if it doesn't exist
const getCollection = async (cName, db) => {
  // get list of collections in database
  const collections = await db.collections();

  // check if collection exists, if so return collection, if not, create it
  if (collections.find((c) => c._name === cName)) {
    return await db.collection(cName);
  } else {
    return db.createCollection(cName);
  }
};

async function saveCollection(collection, data) {
  for (let i = 0; i < data.length; i++) {
    try {
      await collection.save(data[i]);
    } catch (e) {
      console.log(e);
    }
  }
}

async function createHorses(collection) {
  const data = [
    { _key: "horse1", name: "Lufsen"},
    { _key: "horse2", name: "Aprilia"},
    { _key: "horse1o2", name: "Both"}

  ];
  await saveCollection(collection, data);
}

// query cats

export const getHorses = async () => {
  // make connection
  const db = getConnection()
  // make sure cat collection exists
  const collection = await getCollection("horses", db);

    await createHorses(collection);
  // declare array to hold cats
  let result = [];
  // query for cats
  const results = await db.query(aql`FOR h IN horses RETURN h`);
  // loop through array cursor and push results in array
  for await (let horse of results) {
    result.push(horse);
  }
  // log results
  console.log(result);
  // return the list of cats
  return result;
};
const { Database, aql } = require("arangojs");

export const getConnection = () => {
  // establish database connection
  return new Database(
    {
      url: "http://localhost:8529/",
      databaseName: "_system",
      auth: { username: "root", password: "" },
    },
    () => console.log("Hejsan")
  );
};

const getEdge = async (eName, db) => {
  const edges = await db.collections();

  if (edges.find((e) => e._name === eName)) {
    return await db.collection(eName);
  } else {
    return await db.createEdgeCollection(eName);
  }
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

export const toList = async (result) => {
  let list = [];
  while (result.hasNext) {
    var res = await result.next();
    list.push(res);
  }
  return list;
};

async function createFarm(collection) {
  const data = [{ _key: "farm1", name: "Lilledal" }];
  await saveCollection(collection, data);
}

async function createHorses(collection) {
  const data = [
    { _key: "horse1", name: "Lufsen" },
    { _key: "horse2", name: "Aprilia" },
    { _key: "stable", name: "Stable" },
  ];
  await saveCollection(collection, data);
}

export const createEdge = async (from, to, edge_type) => {
  console.log("hej");
  const db = getConnection();
  const e = await getEdge(edge_type, db);
  var edge = await db.query({
    query: `
        UPSERT {
          _from: @from,
          _to: @to
        }
        INSERT {
            _from: @from,
            _to: @to
        }
        UPDATE {
        }
        IN ${edge_type}
        RETURN NEW
        `,
    bindVars: {
      from: from,
      to: to,
    },
  });
  edge = await edge.next();
  return edge;
};

async function createCost(collection, newCost) {
  console.log("create new cost", { newCost });
  const db = getConnection();
  const title = newCost.costTitle;
  const cost = newCost.cost;
  const date = newCost.itemDate;
  const item = newCost.itemId;
  console.log(title);
  var c = await db.query({
    query: `
    UPSERT {
      costTitle: @costTitle,
    }
    INSERT {
      costTitle: @costTitle,
      cost: @cost,
      date: @date,
    }
    UPDATE {
      costTitle: @costTitle,
    }
    IN costs
    RETURN NEW
    `,
    bindVars: {
      costTitle: title,
      cost: cost,
      date: date,
    },
  });
  var addCost = await c.next();
  var edge = await createEdge(item, addCost._id, "costEdge");
  await saveCollection(collection, addCost);
}

export const addCost = async (newCost) => {
  const db = getConnection();
  const collection = await getCollection("costs", db);
  await createCost(collection, newCost);
};


export const addFarm = async () => {
  const db = getConnection();
  const farmcollection = await getCollection("farm", db);
  await createFarm(farmcollection);
};

export const getHorses = async () => {
  // make connection
  const db = getConnection();
  // make sure cat collection exists
  const collection = await getCollection("horses", db);

  await createHorses(collection);

  let result = [];

  const results = await db.query(aql`FOR h IN horses RETURN h`);

  const farm = await db.query(aql`FOR f IN farm RETURN f`);

  var theFarm = await farm.next();

  // loop through array cursor and push results in array
  for await (let horse of results) {
    await createEdge(theFarm._id, horse._id, "horseEdge");
    result.push(horse);
  }

  return result;
};

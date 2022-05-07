import { getConnection, getEdge, toList } from "./db";

export const getAllCostsForFarm = async (farmName) => {
  const db = getConnection();

  const costs = await db.query({
    query: `FOR f in farm
    FILTER f.name == @farmName
    FOR costData IN 2..2 outbound f horseEdge, costEdge
    For horseData IN 1..2 inbound costData costEdge
   return {horse: horseData, cost : costData}`,
    bindVars: {
      farmName: farmName,
    },
  });

  return toList(costs);
};

import { getAllCostsForFarm } from "../../utils/db_costs";

export default async function (req, res) {
   const allCosts = await getAllCostsForFarm("Lilledal");
  res.json(allCosts);
}

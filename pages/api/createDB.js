import { addFarm, getHorses } from "../../utils/db";

export default async function (req, res) {

  const farm = await addFarm();
  const horses = await getHorses();
  res.json(horses);
}


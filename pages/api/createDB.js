import { getHorses } from "../../utils/db";

export default async function (req, res) {

  const horses = await getHorses();
  console.log(horses);
  res.json(horses);
}


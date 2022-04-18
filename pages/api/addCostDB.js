import { addCost } from "../../utils/db";

export default function handler(req, res) {

    console.log(JSON.stringify(req.body));

    const body = JSON.parse(JSON.stringify(req.body));

    const cost =  addCost(body);

}

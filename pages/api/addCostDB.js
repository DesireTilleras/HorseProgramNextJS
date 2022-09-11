import { addCost } from "../../utils/db";

export default function handler(req, res) {

     const body = JSON.parse(JSON.stringify(req.body));

    const cost =  addCost(body);

}

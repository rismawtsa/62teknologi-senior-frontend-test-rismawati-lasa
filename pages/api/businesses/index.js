import { searchBusinesses } from "../../../services/yelpFusion.service";

export default async function handler(req, res) {
  const { query } = req;
  const data = await searchBusinesses(query);

  res.status(200).json({ status: 200, data });
}

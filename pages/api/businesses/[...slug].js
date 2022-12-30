import { getBusinessReview } from "../../../services/yelpFusion.service";

export default async function handler(req, res) {
  const { slug, ...queries } = req.query;
  const [id] = slug;
  const data = await getBusinessReview(id, queries);

  res.status(200).json({ status: 200, data });
}

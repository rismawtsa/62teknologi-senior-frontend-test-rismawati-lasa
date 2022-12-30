import { getQueryString } from "../utils/helper";

const { YELP_FUSION_HOST, YELP_FUSION_API_KEY } = process.env;
const urls = {
  businesses: "businesses",
  searchBusinesses: "businesses/search",
};

const callApi = async ({ url, method = "GET", data, query }) => {
  let endpoints = `${YELP_FUSION_HOST}/${url}`;
  if (query) {
    endpoints += `?${query}`;
  }
  console.log({ endpoints });

  const respon = await fetch(endpoints, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${YELP_FUSION_API_KEY}`,
    },
    body: JSON.stringify(data),
  });
  return respon.json();
};

const searchBusinesses = async (query) => {
  const data = await callApi({
    url: urls.searchBusinesses,
    query: getQueryString(query),
  });

  return data;
};

const getBusinessById = async (id) => {
  const data = await callApi({
    url: `${urls.businesses}/${id}`,
  });

  return data;
};

const getBusinessReview = async (id, queries) => {
  const data = await callApi({
    url: `${urls.businesses}/${id}/reviews?limit=${queries.limit}`,
  });

  return data;
};

export { searchBusinesses, getBusinessById, getBusinessReview };

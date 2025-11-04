import axios from 'axios';

const base_url = process.env.REACT_APP_API_URL || "http://localhost:5001/api/";

export async function getPageContent(page) {
  try {
    const res = await axios.get(`${base_url}pages/${page}`);
    const data = res.data && res.data.content ? res.data.content : res.data;
    return data;
  } catch (err) {
    console.warn(`Failed to fetch page content for ${page}:`, err.message);
    return {};
  }
}

export default { getPageContent };

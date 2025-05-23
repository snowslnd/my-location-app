import axios from "axios";

const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const searchtext = searchParams.get("searchtext");
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    const response = await axios(`${BASE_URL}/textsearch/json` +
      `?query=${encodeURIComponent(searchtext)}` +
      `&location=${lat},${lng}` +
      `&radius=20000` + // in meters (20km)
      `&key=${GOOGLE_API_KEY}`);

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

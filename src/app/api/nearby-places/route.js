import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const BASE_URL = "https://places.googleapis.com/v1/places:searchNearby";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "restaurant";
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    
    const response = await axios.post(
      BASE_URL,
      {
        locationRestriction: {
          circle: {
            center: {
              latitude: parseFloat(lat),
              longitude: parseFloat(lng)
            },
            radius: 2000
          }
        },
        includedTypes: [category]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_API_KEY,
          "X-Goog-FieldMask": "places.displayName,places.location,places.formattedAddress,places.rating,places.photos,places.id"
        }
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    return new Response(JSON.stringify({ 
      error: 'Something went wrong',
      details: error.response?.data || error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

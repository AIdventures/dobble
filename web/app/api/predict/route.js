// https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { NextResponse } from "next/server";

var PREDICTION_API = "http://127.0.0.1:8000/similar_face";

export async function GET(request) {
  // Do whatever you want
  let filename;
  try {
    filename = request.nextUrl.searchParams.get("filename");
  } catch (error) {
    return NextResponse.json({
      error: "No file uploaded"
    }, { status: 500 });
  }

  if (!filename) {
    return NextResponse.json({
      error: "No file uploaded"
    }, { status: 500 });
  }

  // call the prediction API with the filename
  let res, data;
  try {
    res = await fetch(`${PREDICTION_API}/${filename}`);
    data = await res.json();
  } catch (error) {
    console.error(error);
    // if error has a message, return it, else "Error calling prediction API"
    let message = error.message ? error.message : "Error calling prediction API";
    console.error("MESSAGE", message); // "Error calling prediction API
    return NextResponse.json({ error: message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({
      error: "Error calling prediction API"
    }, { status: 500 });
  }

  if (res.status !== 200) {
    return NextResponse.json({
      error: data.error
    }, { status: res.status });
  }

  return NextResponse.json(data, { status: 200 });
}
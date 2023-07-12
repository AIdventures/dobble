// https://nextjs.org/docs/app/building-your-application/routing/router-handlers
import { NextResponse } from "next/server";

export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
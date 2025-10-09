import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("elpis_db");
    
    const foods = await db.collection("foods").find({}).toArray();
    
    return NextResponse.json({ foods });
  } catch (e) {
    console.error("Error fetching foods:", e);
    return NextResponse.json(
      { error: "Failed to fetch foods" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("elpis_db"); // Ganti "elpis" dengan nama database Anda
    const food = await request.json();

    const result = await db.collection("foods").insertOne(food);

    return NextResponse.json({ result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unable to create food item" }, { status: 500 });
  }
}
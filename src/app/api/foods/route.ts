import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 Starting foods API call...");
    
    const client = await clientPromise;
    console.log("✅ MongoDB connected");
    
    const db = client.db("elpis_db");
    console.log("✅ Database selected");
    
    const foods = await db.collection("foods").find({}).toArray();
    console.log(`✅ Found ${foods.length} foods`);
    
    return NextResponse.json({ foods });
  } catch (error) {
    console.error("❌ Error in foods API:", error);
    
    // Type-safe error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: "Failed to fetch foods from database",
        details: errorMessage 
      },
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
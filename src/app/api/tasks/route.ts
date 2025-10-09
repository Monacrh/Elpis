import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("🔍 Starting tasks API call...");
    
    const client = await clientPromise;
    console.log("✅ MongoDB connected");
    
    const db = client.db("elpis_db");
    console.log("✅ Database selected");
    
    const tasks = await db.collection("tasks").find({}).toArray();
    console.log(`✅ Found ${tasks.length} tasks`);
    
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("❌ Error in tasks API:", error);
    
    // Type-safe error handling
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: "Failed to fetch tasks from database",
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
    const task = await request.json();

    const result = await db.collection("tasks").insertOne(task);

    return NextResponse.json({ result });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Unable to create task" }, { status: 500 });
  }
}
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("elpis_db");
    
    const tasks = await db.collection("tasks").find({}).toArray();
    
    return NextResponse.json({ tasks });
  } catch (e) {
    console.error("Error fetching tasks:", e);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
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
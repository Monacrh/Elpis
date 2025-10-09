import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log("✅ MONGODB_URI:", process.env.MONGODB_URI);

    const { id } = params; // langsung dari params, bukan await

    const client = await clientPromise;
    const db = client.db("elpis_db");

    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ task });
  } catch (e) {
    console.error("❌ Error fetching task:", e);
    return NextResponse.json({ error: "Unable to fetch task" }, { status: 500 });
  }
}

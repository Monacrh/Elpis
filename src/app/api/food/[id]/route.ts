import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; 

    const client = await clientPromise;
    const db = client.db("elpis_db");
    const food = await db.collection("foods").findOne({ _id: new ObjectId(id) });

    if (!food) {
      return NextResponse.json({ error: "Food item not found" }, { status: 404 });
    }

    return NextResponse.json({ food });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Unable to fetch food item" },
      { status: 500 }
    );
  }
}

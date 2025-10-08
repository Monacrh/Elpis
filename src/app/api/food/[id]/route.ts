import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("elpis_db"); // Ganti "elpis" dengan nama database Anda
    const id = params.id;

    const food = await db
      .collection("foods")
      .findOne({ _id: new ObjectId(id) });

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
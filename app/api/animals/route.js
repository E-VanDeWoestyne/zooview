import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { name, description, image } = body;
    const newAnimal = await client.animal.create({
      data: {
        name,
        description,
        image,
      },
    });
    return NextResponse.json(newAnimal);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating animal", error },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const animals = await client.animal.findMany();
    return NextResponse.json(animals);
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { message: "Error getting animals", error }
    );
  }
};

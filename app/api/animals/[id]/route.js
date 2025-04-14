import client from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { id } = params;
    const animal = await client.animal.findUnique({
      where: {
        id,
      },
    });
    if (!animal) {
      return NextResponse.json(
        { status: 404 },
        { message: "Animal not found" }
      );
    }
    return NextResponse.json(animal);
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { message: "Error getting animal", error }
    );
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const body = await request.json();
    const { id } = params;
    const { name, description, image } = body;

    const updateAnimal = await client.animal.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        image,
      },
    });
    if (!updateAnimal) {
      return NextResponse.json(
        { status: 404 },
        { message: "Animal not found" }
      );
    }
    return NextResponse.json(updateAnimal);
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { message: "Error updating animal", error }
    );
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = params;
    await client.animal.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ status: 200 }, { message: "Animal deleted" });
  } catch (error) {
    return NextResponse.json(
      { status: 500 },
      { message: "Error deleting animal", error }
    );
  }
};

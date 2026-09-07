import { NextResponse } from "next/server";
import { findPermit } from "../../../lib/parking-data";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const permit = findPermit(id.toUpperCase());

  if (!permit) {
    return NextResponse.json(
      { error: "Permit not found", id },
      { status: 404 }
    );
  }

  return NextResponse.json(permit);
}

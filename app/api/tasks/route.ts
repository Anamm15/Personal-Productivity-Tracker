import { buildSuccessResponse, buildFailedResponse } from "@/lib/response";

export async function GET() {
  return new Response(JSON.stringify([]), { status: 200 });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    return buildSuccessResponse(data, "Task created successfully", 200);
  } catch (error) {
    return buildFailedResponse("Something went wrong", error, 500);
  }
}

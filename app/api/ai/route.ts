import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give 3 viral YouTube video ideas about: ${topic}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("RAW RESPONSE:", data);

    if (!response.ok) {
      return NextResponse.json({
        output: "API FAILED: " + (data?.error?.message || "Unknown error"),
      });
    }

    const output =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return NextResponse.json({
      output: output || "No AI text returned",
    });

  } catch (error) {
    return NextResponse.json({
      output: "Server error: " + String(error),
    });
  }
}

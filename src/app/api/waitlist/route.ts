import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    console.log(`[WAITLIST_REGISTRATION] Attempting insert for: ${email}`);

    const { error } = await supabase.from('waitlist').insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Postgres unique violation code
        return NextResponse.json(
          { error: "This terminal is already registered in the protocol." },
          { status: 409 }
        );
      }
      throw error;
    }

    return NextResponse.json(
      { message: "Successfully added to the synchronization protocol waitlist." },
      { status: 200 }
    );
  } catch (error) {
    console.error("[WAITLIST_ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

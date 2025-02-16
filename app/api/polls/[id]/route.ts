import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { question, options } = await req.json();

    // Poll Create
    const { data: poll, error } = await supabase
      .from("polls")
      .insert([{ question }])
      .select()
      .single();

    if (error) throw error;

    // Options Insert
    const optionsData = options.map((option: string) => ({
      poll_id: poll.id,
      option_text: option,
    }));

    const { error: optionError } = await supabase
      .from("poll_options")
      .insert(optionsData);
    if (optionError) throw optionError;

    return NextResponse.json({ success: true, poll });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

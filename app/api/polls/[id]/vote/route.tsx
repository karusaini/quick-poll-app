import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { optionId } = await req.json();

  // Option की वोट संख्या बढ़ाना
  const { data: poll, error } = await supabase
    .from("polls")
    .select("options")
    .eq("id", id)
    .single();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // वोट को अपडेट करना
  const updatedOptions = poll.options.map((option: any) =>
    option.id === optionId ? { ...option, votes: option.votes + 1 } : option
  );

  // Supabase में अपडेट करना
  const { error: updateError } = await supabase
    .from("polls")
    .update({ options: updatedOptions })
    .eq("id", id);

  if (updateError)
    return NextResponse.json({ error: updateError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}

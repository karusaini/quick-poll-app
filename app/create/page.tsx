"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plus, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [loading, setLoading] = useState(false);

  const addOption = () => setOptions([...options, ""]);

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Fill all fields!");
      return;
    }

    setLoading(true);

    // Poll Create API Call
    const { data: poll, error: pollError } = await supabase
      .from("polls")
      .insert([{ question }])
      .select()
      .single();

    if (pollError) {
      alert(`Error creating poll: ${pollError.message}`);
      setLoading(false);
      return;
    }

    // Poll Options API Call
    const optionsData = options
      .filter((opt) => opt.trim() !== "")
      .map((opt) => ({
        poll_id: poll.id,
        option_text: opt,
      }));

    const { error: optionsError } = await supabase
      .from("poll_options")
      .insert(optionsData);

    if (optionsError) {
      alert(`Error creating options: ${optionsError.message}`);
    } else {
      alert("Poll Created Successfully!");
      setQuestion("");
      setOptions([""]);
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-lg p-6 shadow-lg rounded-xl bg-white">
        <CardHeader className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Create a New Poll
          </h2>
          <p className="text-sm text-gray-500">
            Ask a question and add multiple options.
          </p>
        </CardHeader>

        <Separator />

        <CardContent className="space-y-4">
          <div>
            <Label
              htmlFor="question"
              className="text-sm font-medium text-gray-700"
            >
              Poll Question
            </Label>
            <Input
              id="question"
              placeholder="Enter your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Options</Label>
            <div className="space-y-2">
              {options.map((opt, i) => (
                <Input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(i, e.target.value)}
                  className="mt-1 focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>

            <Button
              onClick={addOption}
              variant="outline"
              className="w-full mt-3 flex items-center gap-2"
            >
              <Plus size={16} /> Add Option
            </Button>
          </div>
        </CardContent>

        <Separator />

        <CardFooter>
          <Button
            onClick={createPoll}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              "Creating..."
            ) : (
              <>
                <Send size={18} /> Create Poll
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

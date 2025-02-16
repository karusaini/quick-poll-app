"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PollForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [loading, setLoading] = useState(false); // 🔹 Loading state

  const addOption = () => {
    if (options.length < 6) setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const createPoll = async () => {
    if (!question.trim() || options.some((opt) => !opt.trim())) {
      alert("Please enter a question and at least two options.");
      return;
    }

    setLoading(true); // 🔹 Start loading state
    try {
      const { data, error } = await supabase.from("polls").insert([
        {
          question,
          options, // Assuming 'options' is an array in Supabase
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      alert("Poll Created Successfully!");
      setQuestion("");
      setOptions(["", ""]); // Reset form
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Failed to create poll. Please try again.");
    } finally {
      setLoading(false); // 🔹 Stop loading state
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-300 bg-white p-6 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Create a Poll
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Enter poll question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />

            <div className="space-y-3">
              {options.map((option, index) => (
                <Input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
            </div>

            {options.length < 6 && (
              <Button variant="outline" onClick={addOption} className="w-full">
                + Add Option
              </Button>
            )}

            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              onClick={createPoll}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Poll"}{" "}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

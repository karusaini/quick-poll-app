"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VoteOptionsProps {
  pollId: string;
  options: { id: string; text: string; votes: number }[];
  onVote: (optionId: string) => void;
}

export default function VoteOptions({
  pollId,
  options,
  onVote,
}: VoteOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!selectedOption) return;
    setIsVoting(true);

    try {
      await onVote(selectedOption);
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label
          key={option.id}
          className={`block p-3 border rounded-lg cursor-pointer ${
            selectedOption === option.id
              ? "bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          <input
            type="radio"
            name={`poll-${pollId}`}
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => setSelectedOption(option.id)}
            className="hidden"
          />
          {option.text}
        </label>
      ))}

      <Button
        className="w-full mt-2"
        disabled={!selectedOption || isVoting}
        onClick={handleVote}
      >
        {isVoting ? "Submitting..." : "Vote"}
      </Button>
    </div>
  );
}

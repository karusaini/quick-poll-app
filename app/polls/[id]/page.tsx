"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import VoteOptions from "@/components/VoteOptions";

interface PollData {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
}

export default function PollPage() {
  const { id } = useParams();
  const [poll, setPoll] = useState<PollData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchPoll() {
      try {
        const res = await fetch(`/api/polls/${id}`);
        const data = await res.json();
        setPoll(data);
      } catch (error) {
        console.error("Failed to fetch poll:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPoll();
  }, [id]);

  const handleVote = async (optionId: string) => {
    await fetch(`/api/polls/${id}/vote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ optionId }),
    });

    // Re-fetch poll data after voting
    const res = await fetch(`/api/polls/${id}`);
    const data = await res.json();
    setPoll(data);
  };

  if (loading) return <p>Loading...</p>;
  if (!poll) return <p>Poll not found!</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{poll.question}</h1>
      <VoteOptions
        pollId={poll.id}
        options={poll.options}
        onVote={handleVote}
      />
    </div>
  );
}

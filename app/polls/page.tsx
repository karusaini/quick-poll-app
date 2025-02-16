import PollCard from "@/components/PollCard";

const polls = [
  { id: "1", question: "What is your favorite color?" },
  { id: "2", question: "Best programming language?" },
];

export default function PollsPage() {
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Live Polls</h1>
      {polls.map((poll) => (
        <PollCard key={poll.id} poll={poll} />
      ))}
    </div>
  );
}

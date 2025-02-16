import Link from "next/link";
import { Card } from "@/components/ui/card";

export default function PollCard({ poll }) {
  return (
    <Card className="p-4 mb-4">
      <h2 className="text-lg font-semibold">{poll.question}</h2>
      <Link href={`/polls/${poll.id}`} className="text-blue-500">
        Vote Now →
      </Link>
    </Card>
  );
}

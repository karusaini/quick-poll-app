import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg sm:max-w-md text-center shadow-lg border border-gray-200 bg-white p-6 sm:p-8 rounded-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-800">
            Welcome to Quick Polls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-lg sm:text-base mb-6">
            Create polls, vote in real-time, and view results instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/polls" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto">
                View Polls
              </Button>
            </Link>
            <Link href="/create" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Create Poll
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

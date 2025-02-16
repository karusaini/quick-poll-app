export const createPoll = async (question: string, options: string[]) => {
  const res = await fetch("/api/polls", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, options }),
  });
  return res.json();
};

export const getPoll = async (pollId: string) => {
  const res = await fetch(`/api/polls/${pollId}`);
  return res.json();
};

export const votePoll = async (pollId: string, option: string) => {
  const res = await fetch("/api/votes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ poll_id: pollId, option }),
  });
  return res.json();
};

export const getPollResults = async (pollId: string) => {
  const res = await fetch(`/api/results/${pollId}`);
  return res.json();
};

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

interface Prompt {
  id: string;
  content: string;
  type: "USER" | "SYSTEM";
  createdAt: string;
}
export function usePrompts(projectId: string) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchPrompts = async () => {
      const token = getToken();
      const res = await axios.get(
        `${process.env.BACKEND_URL}/prompts/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPrompts(res.data.prompts);
    };

    let interval = setInterval(fetchPrompts, 100);
    return () => clearInterval(interval);
  });

  return {
    prompts,
  };
}

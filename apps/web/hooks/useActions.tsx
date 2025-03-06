import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";

interface Action {
  id: string;
  content: string;
  createdAt: string;
}

export function useActions(projectId: string) {
  const [actions, setActions] = useState<Action[]>([]);
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchPrompts = async () => {
      const token = getToken();
      const res = await axios.get(
        `${process.env.BACKEND_URL}/actions/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setActions(res.data.actions);
    };

    let interval = setInterval(fetchPrompts, 100);
    return () => clearInterval(interval);
  });

  return {
    actions,
  };
}

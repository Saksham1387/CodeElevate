import NavBar from "@/components/nav-bar";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { usePrompts } from "../../../hooks/usePrompts";
import { useActions } from "../../../hooks/useActions";
import { useState } from "react";
import axios from "axios";

export const Project = ({ params }: { params: { projectId: string } }) => {
  const { prompts } = usePrompts(params.projectId);
  const { actions } = useActions(params.projectId);
  const [input, setInput] = useState("");
  return (
    <div>
      <NavBar />
      <div className="flex h-screen">
        <div className="w-1/4 border-r-2 h-screen flex flex-col justify-between ">
          <div>Chat history</div>
          {prompts
            .filter((prompt) => prompt.type === "USER")
            .map((prompt) => (
              <div key={prompt.id}>{prompt.content}</div>
            ))}

          {actions.map((action) => (
            <div key={action.id}>{action.content}</div>
          ))}

          <div className="flex flex-row">
            <Input onChange={(e) => setInput(e.target.value)}></Input>
            <button
              className="cursor-pointer"
              onClick={async () => {
                await axios.post(`${process.env.WORKER_API_URL}/prompt`, {
                  prompt: input,
                });
              }}
            >
              <Send />
            </button>
          </div>
        </div>
        <div className="w-3/4 p-5">
          <iframe src="http://localhost:8080" width={"100%"} height={"100%"} />
        </div>
      </div>
    </div>
  );
};

export default Project;

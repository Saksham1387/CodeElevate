import express, { json } from "express";
import cors from "cors";
import { prisma } from "db/db";
import { ArtifactProcessor } from "./artifact-parser";
import { onFileUpdate, onShellCommand } from "./os";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "./prompts";
import OpenAI from "openai";
const app = express();

// AIzaSyBEOBUnhbcbBFf2xdSg2LGmOnIi7BED4GQ

app.use(json());
app.use(cors());
// const client = new OpenAI();
const client = new Anthropic({apiKey:"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"});

app.post("/prompt", async (req, res) => {
  const { prompt, projectId } = req.body;
  const allPrompts = await prisma.prompt.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  let artifactProcessor = new ArtifactProcessor(
    "",
    onFileUpdate,
    onShellCommand
  );
  let artifact = "";

  let response = client.messages
    .stream({
      messages: allPrompts.map((p: any) => ({
        role: p.type === "USER" ? "user" : "assistant",
        content: p.content,
      })),
      system: systemPrompt,
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 8000,
    })
    .on("text", (text) => {
      artifactProcessor.append(text);
      artifactProcessor.parse();
      artifact += text;
    })
    .on("finalMessage", async (message) => {
      console.log("done!");
      await prisma.prompt.create({
        data: {
          value: artifact,
          projectId,
          type: "USER",
        },
      });
      await prisma.action.create({
        data: {
          content: "Done!",
          projectId,
        },
      });
    })
    .on("error", (error) => {
      console.log("error", error);
    });

  res.json({ response });
});


app.listen(9091, () => {
  console.log("Server is running on port 9091");
});
//   const response = await client.chat.completions.create({
//     model: "gpt-4o",
//     messages: allPrompts.map((p: any) => ({
//       role: p.type === "USER" ? "user" : "assistant",
//       content: p.content,
//     })),

//     stream: true,
//     max_tokens: 8000,
//   })

import express from "express";
import { prisma } from "db/db";
import { authMiddleware } from "./middleware";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/project", authMiddleware, async (req, res) => {
  const body = req.body;
  const userId = req.userId!;
  const name = "random-project-name";
  const project = await prisma.project.create({
    data: {
      name,
      description: body.prompt,
      userId: userId,
    },
  });

  res.status(201).json({ projectId: project.id });
});

app.get("/projects", authMiddleware, async (req, res) => {
  const userId = req.userId!;
  const projects = await prisma.project.findMany({
    where: {
      userId: userId,
    },
  });
  res.status(200).json({ projects: projects });
});

app.listen(8080);

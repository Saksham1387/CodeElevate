import express from "express";
import { prisma } from "db/db";
import { redis } from "redis/redis";
import { authMiddleware } from "./middleware";

const app = express();

app.use(express.json());

app.post("/project", authMiddleware, async (req, res) => {
  const prompt = req.body;
  const userId = req.userId!;
  const name = "random-project-name";
  const project = await prisma.project.create({
    data: {
      name,
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
  res.status(200).json(projects);
});

app.get("");

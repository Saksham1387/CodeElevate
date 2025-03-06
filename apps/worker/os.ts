import { prisma } from "db/db";

const BASE_WORKER_DIR = process.env.BASE_WORKER_DIR || "/tmp/bolty-worker";

if (!Bun.file(BASE_WORKER_DIR).exists()) {
  Bun.write(BASE_WORKER_DIR, "");
}

export async function onFileUpdate(
  filePath: string,
  content: string,
  projectId: string
) {
  console.log("writing fiel", filePath);
  await Bun.write(`${BASE_WORKER_DIR}/${filePath}`, content);
  await prisma.action.create({
    data: {
      projectId,
      content: `Updated file,${filePath}`,
    },
  });
}

export async function onShellCommand(shellCommand: string,projectId:string) {
  const commands = shellCommand.split("&&");

  for (const command of commands) {
    console.log("Running command: ", command);
    const result = Bun.spawnSync({
      cmd: command.split(" "),
      cwd: BASE_WORKER_DIR,
    });
    await prisma.action.create({
      data:{
        projectId,
        content:`Run Command: ${command}`
      }
    })
    console.log(result.stdout);
    console.log(result.stderr.toString());
  }
}

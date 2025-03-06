import {
  AutoScalingClient,
  DescribePoliciesCommand,
  SetDesiredCapacityCommand,
  DescribeAutoScalingInstancesCommand,
  TerminateInstanceInAutoScalingGroupCommand,
} from "@aws-sdk/client-auto-scaling";
import express, { json } from "express";

type Machine = {
  ip: string;
  isUsed: boolean;
  assignedProject?: String;
};

const app = express();
app.use(json());

const client = new AutoScalingClient({
  region: "ap-sount-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY || "",
    secretAccessKey: process.env.AWS_ACCESS_SECRET || "",
  },
});

const command = new SetDesiredCapacityCommand({
  AutoScalingGroupName: "",
  DesiredCapacity: 3,
});

const ALL_MACHINES: Machine[] = [];

setInterval(async () => {
  const command = new DescribeAutoScalingInstancesCommand();
  const res = await client.send(command);
}, 10 * 1000);

app.get("/:projectId", async (req, res) => {
  const idealMachine = ALL_MACHINES.find((x) => x.isUsed === false);
  if (!idealMachine) {
    res.status(404).send("No ideal Machine");
    return;
  }
  idealMachine.isUsed = true;

  const command = new SetDesiredCapacityCommand({
    AutoScalingGroupName: "vscode-asg",
    DesiredCapacity:
      ALL_MACHINES.length +
      (5 - ALL_MACHINES.filter((x) => x.isUsed === false).length),
  });

  await client.send(command);

  res.send({
    ip: idealMachine.ip,
  });
});

app.post("/destroy", async (req,res) =>{
    const machineId = req.body.machineId;

    const command = new TerminateInstanceInAutoScalingGroupCommand({
        InstanceId:machineId,
        ShouldDecrementDesiredCapacity:true
    })

    client.send(command)

    res.send({
        message:"Instance Destroyed"
    })
})

const data = await client.send(command);

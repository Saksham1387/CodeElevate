/*
    <boltArtifact>
        <boltAction type="shell">
            npm run start
        </boltAction>
        <boltAction type="file" filePath="src/index.js">
            console.log("Hello, world!");
        </boltAction>
    </boltArtifact>
*/

export class ArtifactProcessor {
  public currentArtifact: string;
  private onFileContent: (filaPath: string, onFileContent: string) => void;
  private onShellCommand: (command: string) => void;

  constructor(
    currentArtifact: string,
    onFileContent: (filaPath: string, onFileContent: string) => void,
    onShellCommand: (command: string) => void
  ) {
    this.currentArtifact = currentArtifact;
    this.onFileContent = onFileContent;
    this.onShellCommand = onShellCommand;
  }

  append(artifact: string) {
    this.currentArtifact += artifact;
  }

  parse() {
    const latestActionStart = this.currentArtifact
      .split("\n")
      .findIndex((line) => line.includes("<boltAction type=>"));
    const latestActionEnd = this.currentArtifact
      .split("\n")
      .findIndex(
        (line) =>
          line.includes("</boltAction>") ??
          this.currentArtifact.split("\n").length - 1
      );

    if (latestActionStart === -1) {
      return;
    }

    const lastestActionType = this.currentArtifact
      .split("\n")
      [latestActionStart].split("type=")[1]
      .split(">")[0];
    const latestActionContent = this.currentArtifact
      .split("\n")
      .slice(latestActionStart, latestActionEnd + 1)
      .join("\n");

    try {
      if (lastestActionType == '"shell"') {
        let shellCommand = latestActionContent.split("\n").slice(1).join("\n");
        if (shellCommand.includes("</boltAction>")) {
          shellCommand = shellCommand.split("</boltAction>")[0];
          this.currentArtifact =
            this.currentArtifact.split(latestActionContent)[1];
          this.onShellCommand(shellCommand);
        }
      } else if (lastestActionType == '"file"') {
        const filePath = this.currentArtifact
          .split("\n")
          [latestActionStart].split("filePath=")[1]
          .split(">")[0];
        let fileContent = latestActionContent.split("\n").slice(1).join("\n");
        if (fileContent.includes("</boltAction>")) {
          fileContent = fileContent.split("</boltAction>")[0];
          this.currentArtifact =
            this.currentArtifact.split(latestActionContent)[1];
          this.onFileContent(filePath.split('"')[1], fileContent);
        }
      }
    } catch (e) {}
  }
}

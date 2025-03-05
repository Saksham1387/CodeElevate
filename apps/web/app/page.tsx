import { ProjectsDrawer } from "@/components/app-sidebar";
import NavBar from "@/components/nav-bar";
import PromptInterface from "@/components/prompt-input";

export default function Home() {
  return (
    <div className="text-5xl">
      <NavBar />
      <ProjectsDrawer />
      <PromptInterface />
    </div>
  );
}

import React from "react";
import { FrameByAnima } from "./sections/FrameByAnima/FrameByAnima";
import { HeaderByAnima } from "./sections/HeaderByAnima";
import { LeftMenuByAnima } from "./sections/LeftMenuByAnima";
import { ProjectsView } from "./sections/ProjectsView";
import { TeamsView } from "./sections/TeamsView";
import { ChatsView } from "./sections/ChatsView";
import { ApplicationsView } from "./sections/ApplicationsView";

export const Screen = (): JSX.Element => {
  const [activeView, setActiveView] = React.useState("dashboard");

  const renderView = () => {
    switch (activeView) {
      case "projects":
        return <ProjectsView />;
      case "teams":
        return <TeamsView />;
      case "chats":
        return <ChatsView />;
      case "applications":
        return <ApplicationsView />;
      default:
        return <FrameByAnima />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-main-colorsbackground-alt overflow-hidden">
      <LeftMenuByAnima onViewChange={setActiveView} activeView={activeView} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <HeaderByAnima />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </div>
  );
};
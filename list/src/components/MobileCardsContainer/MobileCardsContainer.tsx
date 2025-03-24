import { Task } from "../../tasksSlice.ts";
import MobileCard from "../MobileCard/MobileCard.tsx";
import React from "react";

export interface MobileCardsProps {
  key?: number | string;
  onDeleteClick?: (taskId: number) => void;
  onCheckChange?: (taskId: number) => void;
  tasks: Task[];
}

const mobileCardsContainer: React.FC<MobileCardsProps> = ({
  tasks,
  onDeleteClick,
  onCheckChange,
}) => {
  return (
    <>
      <div className="cards">
        {tasks.map((task: Task) => (
          <MobileCard
            key={task.id}
            task={task}
            onDeleteClick={onDeleteClick}
            onCheckChange={onCheckChange}
          />
        ))}
      </div>
    </>
  );
};

export default mobileCardsContainer;

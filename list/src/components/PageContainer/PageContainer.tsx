import React from "react";
import "../App/App.scss";
import "./PageContainer.scss";

interface PageContainerProps {
  fullWidth?: boolean;
}

const PageContainer = ({
  children,
  fullWidth,
}: React.PropsWithChildren<PageContainerProps>) => {
  return (
    <div
      className={
        fullWidth ? "page-container page-container_main" : "page-container"
      }
    >
      <h2 className="page-container__header">React To-Do List</h2>
      {children}
    </div>
  );
};

export default PageContainer;

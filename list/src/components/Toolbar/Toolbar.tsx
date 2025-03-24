import React from "react";
import Button from "../Button/Button.tsx";
import { LinkProps, useLocation } from "react-router";
import "./Toolbar.scss";
import { isMobile } from "../MainPage/MainPage.tsx";

interface ToolbarProps {
  className?: string;
  to?: LinkProps["to"];
}

interface LinkData {
  status: string;
  text: string;
}

export const STATUS_PARAM_NAME = "status";
export const STATUS_PARAM_ALL_VALUE = "all";
export const STATUS_PARAM_TODO_VALUE = "to-do";
export const STATUS_PARAM_COMPLETED_VALUE = "completed";

const linksData: LinkData[] = [
  { status: STATUS_PARAM_ALL_VALUE, text: "All" },
  { status: STATUS_PARAM_TODO_VALUE, text: "To-do" },
  { status: STATUS_PARAM_COMPLETED_VALUE, text: "Completed" },
];

const Toolbar = ({ className }: React.PropsWithChildren<ToolbarProps>) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  return (
    <div className={`toolbar ${className}`}>
      <div className="toolbar__left">
        <Button className="toolbar__main-button" to="/form.html">
          Add a new to-do
        </Button>
      </div>
      <div className="toolbar__right">
        {isMobile && (
          <Button
            onClick={() => setOpen((open) => !open)}
            type="drop-down"
            className="toolbar__drop-button"
          >
            Sort by
          </Button>
        )}
        {linksData.map((link) => {
          const to = {
            pathname: "/",
            search: `?${STATUS_PARAM_NAME}=${link.status}`,
          };

          const currentStatus =
            new URLSearchParams(location.search).get(STATUS_PARAM_NAME) ||
            STATUS_PARAM_ALL_VALUE;
          const isButtonActive = currentStatus === link.status;

          if (isMobile && open) {
            return (
              <div className="toolbar__drop-content">
                <Button
                  className="toolbar__secondary-button"
                  active={isButtonActive}
                  to={to}
                  key={link.text}
                >
                  {link.text}
                </Button>
              </div>
            );
          }

          if (!isMobile) {
            return (
              <Button
                className="toolbar__secondary-button"
                active={isButtonActive}
                to={to}
                key={link.text}
              >
                {link.text}
              </Button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Toolbar;

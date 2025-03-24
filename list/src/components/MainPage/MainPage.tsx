import Toolbar from "../Toolbar/Toolbar.tsx";
import PageContainer from "../PageContainer/PageContainer.tsx";
import "./MainPage.scss";
import TaskTable from "../TaskTable/TaskTable.tsx";

//let currentUrl = useLocation();

// const filteredParam = React.useMemo(
//  () => new URLSearchParams(currentUrl.search).get(STATUS_PARAM_NAME),
//  [currentUrl],
//);

//const filteredTasks = React.useMemo(() => filterTasks(tasks, param));

export const isMobile = window.innerWidth <= 600;

const MainPage = () => {
  return (
    <>
      <PageContainer fullWidth={true}>
        <Toolbar className="main-page__toolbar"></Toolbar>
        <TaskTable />
      </PageContainer>
    </>
  );
};

export default MainPage;

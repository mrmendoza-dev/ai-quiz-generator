import { icons } from "@/assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useApplicationShell } from "@/contexts/ApplicationShellContext";

function Sidebar() {
  const pages = [
    {
      name: "Home",
      icon: icons.faHouse,
      link: "/",
    },
    // {
    //   name: "Quiz",
    //   icon: icons.faQuestion,
    //   link: "/quiz",
    // },
  ];

  const { expandedSidebar, setExpandedSidebar, sidebarWidths } =
    useApplicationShell();

  const sidebarWidth = expandedSidebar
    ? sidebarWidths.expanded
    : sidebarWidths.collapsed;

  return (
    <aside
      className="Sidebar h-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden ease-in-out"
      aria-label="Sidenav"
      id="drawer-navigation"
      style={{ width: `${sidebarWidth}rem` }}
    >
      {expandedSidebar && (
        <div className="overflow-y-auto py-5 px-3 h-full">
          <hr className="border-t my-4-4 border-gray-200 dark:border-gray-700" />

          <ul className="pt-5 mt-5 space-y-2">
            {pages.map((page, index) => (
              <li key={index}>
                <Link
                  to={page.link}
                  className="flex items-center justify-start w-full px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FontAwesomeIcon icon={page.icon} className="mr-3" />
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;

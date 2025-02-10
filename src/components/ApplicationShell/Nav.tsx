import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "@/assets/icons";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";
import { useApplicationShell } from "@/contexts/ApplicationShellContext";



function Nav() {

      const {
        expandedSidebar,
        setExpandedSidebar,
      } = useApplicationShell();

  return (
      <nav className="Nav bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            {/* <button
              className="mr-2 px-3 py-2 text-sm font-medium focus:outline-none rounded-md border hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-primary-700 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => {
                setExpandedSidebar(!expandedSidebar);
              }}
            >
              <FontAwesomeIcon icon={icons.faBars} className="" />
            </button> */}

            <Link to="/" className="flex items-center justify-between gap-2">
              {/* <img
                src="/images/logo.png"
                className="mr-1 h-8"
                alt="Flowbite Logo"
              /> */}

              <FontAwesomeIcon icon={icons.faCircleQuestion} className="size-8 text-indigo-500" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white text-black">
                AI Quiz Generator
              </span>

            </Link>
          </div>
          <div className="flex items-center lg:order-2">
            <ThemeToggle />
            <button
              type="button"
              data-drawer-toggle="drawer-navigation"
              aria-controls="drawer-navigation"
              className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Toggle search</span>
              <FontAwesomeIcon
                aria-hidden="true"
                icon={icons.faMagnifyingGlass}
                className="w-5 h-5"
              />
            </button>

          </div>
        </div>
      </nav>
  );
}

export default Nav;

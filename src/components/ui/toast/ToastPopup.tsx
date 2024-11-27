import { icons } from "@assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useToast } from "@contexts/ToastContext";

const ToastPopup = ({ className, children, timerSeconds = 5 }: any) => {
  const { toastMessage, setToastMessage } = useToast();
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (toastMessage) {
      setDisplay(true);
      const timer = setTimeout(() => {
        setToastMessage(null);
        setDisplay(false);
      }, timerSeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  function handleClose() {
    setDisplay(false);
    setToastMessage(null);
  }

  const defaultClasses =
    "flex flex-col gap-2 w-full max-w-sm w-fit p-4 text-gray-500 rounded-md shadow dark:text-gray-400 bg-gray-800 border border-primary-600";
  return (
    <div
      id="toast"
      className={`${defaultClasses} ${className}  ${
        display
          ? "opacity-100 pointer-events-auto duration-300"
          : "opacity-0 pointer-events-none duration-[50ms]"
      }
      transition-opacity duration-300
      absolute z-[9999] left-1/2 transform -translate-x-1/2 top-16
      `}
      role="alert"
    >
      <div className="flex items-start justify-between gap-2 w-full ">
        <div className="text-sm font-normal">{toastMessage}</div>
        <div className="flex items-center ms-auto">
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-md p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
            data-dismiss-target="#toast"
            aria-label="Close"
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={icons.faXmark} className="size-5" />
          </button>
        </div>
      </div>
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default ToastPopup;

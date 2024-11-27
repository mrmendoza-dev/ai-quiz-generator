import { icons } from "@assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Modal({ isOpen, toggleModal, title, children }: any) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: any) => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  const defaultClasses =
    "p-6 text-gray-500 rounded-md shadow dark:text-gray-400 bg-gray-800 border border-primary-600";
  return (
    <div>
      <div className="ModalBackground fixed inset-0 bg-black opacity-50 z-[99]"></div>
      <div
        className={`ModalBody fixed inset-0 flex items-center justify-center z-[100]`}
        onClick={handleOverlayClick}
      >
        <div
          className={`${defaultClasses} relative w-full max-w-lg`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between rounded-t mb-4">
            <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={toggleModal}
            >
              <FontAwesomeIcon icon={icons.faXmark} className="size-5" />
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;

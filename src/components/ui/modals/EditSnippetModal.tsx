import Modal from "./Modal";

const EditModal = ({ isOpen, toggleModal }: any) => {
  if (!isOpen) return null;

  return (
    <div className="EditModal">
      <Modal isOpen={isOpen} toggleModal={toggleModal} title="Edit Snippet">
        <div className="flex items-center justify-between">
          <div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                The last rate
              </span>
            </label>
          </div>
          <div>
            <select
              id="last-rate-select"
              className="bg-white border pr-10 pl-2 py-1.5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option>Min</option>
              <option>Max</option>
            </select>
          </div>
        </div>

        <div className="w-full flex justify-center items-center space-x-4 rounded-b dark:border-gray-600">
          <button
            type="submit"
            className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-700 dark:hover:bg-primary-800 dark:focus:ring-primary-800"
            onClick={toggleModal}
          >
            Apply
          </button>
          <button
            type="reset"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;

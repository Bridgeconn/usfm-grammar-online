import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function Help() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div>
        <button
          className="inline-flex items-center px-3 py-1 rounded-full sm:text-sm md:text-lg font-medium bg-blue-400 text-white hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mr-5"
          onClick={openModal}
        >
          Help
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="hero min-h-60 bg-base-200">
                    <div className="hero-content text-center">
                      <div className="max-w-md">
                        <h3 className="mb-5 text-5xl font-bold">Help Guide</h3>
                        <div className="overflow-y-auto max-h-[50vh] text-sm sm:text-base text-justify p-2">
                          <p className="mb-4">
                            Welcome to <strong>USFM Grammar</strong>! This tool
                            helps you parse, validate, and convert USFM files
                            into structured JSON and other formats.
                          </p>

                          <h4 className="font-semibold">
                            1. Selecting Input Data
                          </h4>
                          <ul className="list-disc list-inside mb-4">
                            <li>
                              Choose the input type:{" "}
                              <strong>USFM, USX, or USJ</strong>.
                            </li>
                            <li>Uploading a file auto-detects the format.</li>
                            <li>
                              If pasting data, manually select the format.
                            </li>
                          </ul>

                          <h4 className="font-semibold">
                            2. Configuring Output
                          </h4>
                          <ul className="list-disc list-inside mb-4">
                            <li>
                              <strong>Include Markers:</strong> Choose to keep
                              or remove markers.
                            </li>
                            <li>
                              <strong>Filter Options:</strong> Select markers to
                              include/exclude (visible only for &quot;USJ&quot;
                              and &quot;Table&quot; output types).
                            </li>
                          </ul>

                          <h4 className="font-semibold">
                            3. Viewing and Downloading Results
                          </h4>
                          <ul className="list-disc list-inside mb-4">
                            <li>
                              Select an output tab (e.g., USJ, Table, BibleNLP,
                              etc.).
                            </li>
                            <li>Results appear on the right panel.</li>
                            <li>
                              Use the <strong>download</strong> button to save
                              or the <strong>copy</strong> button to copy the
                              content.
                            </li>
                          </ul>

                          <h4 className="font-semibold">
                            4. Additional Features
                          </h4>
                          <ul className="list-disc list-inside mb-4">
                            <li>
                              The <strong>GitHub</strong> icon links to the
                              source code.
                            </li>
                            <li>
                              Processing <strong>status messages</strong> appear
                              at the bottom after any operation.
                            </li>
                          </ul>

                          <p>
                            For more details, check the{" "}
                            <strong>About Us</strong> section. Happy parsing!
                          </p>
                        </div>
                        <div className="text-center mt-4">
                          <button
                            type="button"
                            className="inline-flex px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400"
                            onClick={closeModal}
                          >
                            Got it!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

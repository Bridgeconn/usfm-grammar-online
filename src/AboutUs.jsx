import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

export default function AboutUs() {
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
          About Us
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
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
                  <div className="hero min-h-60 bg-base-200 ">
                    <div className="hero-content text-center">
                      <div className="max-w-md">
                        <h3 className="mb-5 text-5xl font-bold">About Us</h3>
                        <p className="mb-5 text-justify">
                          An elegant USFM parser (or validator) that uses a
                          Context Free Grammar to model USFM. The grammar is
                          written using tree sitter. Supports USFM 3.x.
                          <br />
                          <br />
                          The parsed USFM is an intuitive and easy to manipulate
                          JSON structure that allows for painless extraction of
                          scripture and other content from the markup. USFM
                          Grammar is also capable of reconverting the generated
                          JSON back to USFM.
                        </p>
                        <button
                          type="button"
                          className="inline-flex btn bg-sky-700 text-white hover:bg-sky-400"
                          onClick={closeModal}
                        >
                          Get Started
                        </button>
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

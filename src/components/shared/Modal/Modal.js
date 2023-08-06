import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import './Modal.scss';

const Modal = ({
  children,
  onClose = () => null,
  shouldShowModal = false,
}) => {
  if (!shouldShowModal) {
    return null;
  }

  return (
    <>
      <Transition appear show={shouldShowModal} as={Fragment}>
        <Dialog as="div" className="modal-dialog" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="overlay" />
          </Transition.Child>

          <div className="modal-container">
            <div className="modal-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="modal-screen-body">
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default Modal;
const ModalDimmed = ({ onModalClose }: { onModalClose: () => void }) => (
  <div
    onClick={onModalClose}
    className="fixed z-[100] left-0 right-0 top-0 w-[100vw] h-[100dvh] bg-gray-500 opacity-40"
  ></div>
);

export default ModalDimmed;

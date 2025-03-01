import ModalWrapper from '../wrapper/ModalWrapper';

type ModalAddOptionProps = {
  clientX: string;
  clientY: string;
  onSelectScheduleType: () => void;
};

const ModalSelectOption = ({
  clientX,
  clientY,
  onSelectScheduleType,
}: ModalAddOptionProps) => {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  if (!clientX || !clientY) {
    return null;
  }

  const modalWidth = 216;
  const modalHeight = 100;

  let posX = Number(clientX);
  let posY = Number(clientY);

  if (posX + modalWidth > viewportWidth) {
    posX = viewportWidth - modalWidth;
  }

  if (posY + modalHeight > viewportHeight) {
    posY = viewportHeight - modalHeight;
  }

  return (
    <ModalWrapper>
      <div
        style={{
          left: `${posX}px`,
          top: `${posY}px`,
        }}
        className="absolute z-[110] w-[216px] h-auto p-[12px] bg-white shadow-lg rounded-[12px]"
      >
        <strong className="sr-only">일정 유형 선택</strong>
        <ul>
          <li className="mb-[4px]">
            <button
              type="button"
              className="block w-full text-left"
              onClick={onSelectScheduleType}
            >
              일정
            </button>
          </li>
        </ul>
      </div>
    </ModalWrapper>
  );
};
export default ModalSelectOption;

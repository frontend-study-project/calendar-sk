import ModalWrapper from '../wrapper/ModalWrapper';

type ModalAddOptionProps = {
  clientX: string;
  clientY: string;
  onModalClose: () => void;
};

const ModalAddOption = ({
  clientX,
  clientY,
  onModalClose,
}: ModalAddOptionProps) => {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  if (!clientX || !clientY) {
    return null;
  }

  const modalWidth = 216; // 모달 너비
  const modalHeight = 100; // 모달 대략적인 높이 (ul 요소 높이에 따라 조정 필요)

  // 문자열을 숫자로 변환
  let posX = Number(clientX);
  let posY = Number(clientY);

  // 모달이 화면 오른쪽 밖으로 나가지 않도록 조정
  if (posX + modalWidth > viewportWidth) {
    posX = viewportWidth - modalWidth;
  }

  // 모달이 화면 아래쪽 밖으로 나가지 않도록 조정
  if (posY + modalHeight > viewportHeight) {
    posY = viewportHeight - modalHeight;
  }

  return (
    <ModalWrapper>
      <div
        onClick={onModalClose}
        className="fixed z-[100] left-0 right-0 top-0 w-[100vw] h-[100dvh] bg-gray-500 opacity-20"
      ></div>
      <div
        style={{
          left: `${posX}px`,
          top: `${posY}px`,
        }}
        className="absolute z-[110] w-[216px] h-auto p-[12px] bg-white shadow-lg rounded-[12px]"
      >
        <strong className="sr-only">일정 유형 선택</strong>
        <ul>
          <li className="mb-[4px]">일정</li>
          <li>할일</li>
        </ul>
      </div>
    </ModalWrapper>
  );
};
export default ModalAddOption;

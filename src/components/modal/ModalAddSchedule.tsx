import { useEffect, useRef, useState } from 'react';
import ModalWrapper from '../wrapper/ModalWrapper';

type ModalAddScheduleProps = {
  eventId: string;
  prevTitle: string;
  start: Date | null;
  end: Date | null;
  onAddScheduleDetail: (eventId: string, title: string) => void;
  onClose: () => void;
};

const ModalAddSchedule = ({
  eventId,
  prevTitle,
  start,
  end,
  onClose,
  onAddScheduleDetail,
}: ModalAddScheduleProps) => {
  const day = ['일', '월', '화', '수', '목', '금', '토'];
  const [title, setTitle] = useState('');
  const titInpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (prevTitle) {
      setTitle(prevTitle);
    }
  }, [prevTitle]);

  if (!start || !end) return;

  const startDate = `${start.getMonth() + 1}월 ${start.getDate()}일 ${day[start.getDay()]}`;
  const endDate = `${end.getMonth() + 1}월 ${end.getDate()}일 ${day[end.getDay()]}`;

  const handleChangeTitleInp = (e) => {
    setTitle(e.target.value);
  };

  const handleClickCancel = () => {
    const check = confirm(
      '취소 버튼을 누를 경우 해당 일정은 삭제됩니다. 삭제하시겠습니까?'
    );

    if (check) {
      onClose();
    }
  };

  const handleClickConfirm = () => {
    if (titInpRef.current) {
      onAddScheduleDetail(eventId, titInpRef.current.value);
    }

    const check = confirm('일정을 등록하시겠습니까?');

    if (check) {
      onClose();
    }
  };

  return (
    <ModalWrapper>
      <div className="z-[200] absolute left-[50%] top-[50%] p-[20px] translate-x-[-50%] translate-y-[-50%] w-[568px] rounded-[24px] bg-white shadow-xl">
        <div>
          <input
            type="text"
            name="title"
            id="scheduleTit"
            placeholder="일정 제목"
            value={title}
            className="block"
            ref={titInpRef}
            onChange={handleChangeTitleInp}
          />
          <select name="color" id="scheduleColor" className="block">
            <option>컬러</option>
            <option value="red">red</option>
            <option value="orange">orange</option>
            <option value="yellow">yellow</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="purple">purple</option>
            <option value="pink">pink</option>
          </select>
          <span className="block">
            {startDate} - {endDate}
          </span>
        </div>
        <div className="text-right">
          <button type="button" onClick={handleClickCancel}>
            취소
          </button>
          <button type="button" onClick={handleClickConfirm}>
            확인
          </button>
        </div>
        <button
          type="button"
          className="absolute right-[20px] top-[20px] cursor-pointer"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </ModalWrapper>
  );
};
export default ModalAddSchedule;

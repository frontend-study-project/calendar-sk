import { useCallback, useEffect, useRef, useState } from 'react';
import ModalWrapper from '../wrapper/ModalWrapper';
import { useCalendarStore } from '../../store';
import { BlockPicker } from 'react-color';

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
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [colorPicker, setColorPicker] = useState('#BD83CE');
  const titInpRef = useRef<HTMLInputElement>(null);

  const { deleteEvent, updateEventColor } = useCalendarStore();

  useEffect(() => {
    if (prevTitle) {
      setTitle(prevTitle);
    }
  }, [prevTitle]);

  const handleChangeTitleInp = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const handleClickCancel = useCallback(() => {
    const check = confirm('해당 일정을 삭제하시겠습니까?');

    if (check) {
      deleteEvent(eventId);
      onClose();
    }
  }, []);

  const handleClickConfirm = useCallback(() => {
    if (!titInpRef.current) return;

    const titleInput = titInpRef.current.value;

    if (titleInput === '') {
      alert('제목을 입력해주세요');
      return;
    } else {
      onAddScheduleDetail(eventId, titleInput);
    }

    const check = confirm('일정을 등록하시겠습니까?');

    if (check) {
      console.log(colorPicker);
      updateEventColor(eventId, colorPicker);
      onClose();
    }
  }, [titInpRef, colorPicker]);

  const handleColorPickerChange = (color) => {
    setColorPicker(color.hex);
  };

  const handleColorBtnClick = () => {
    setIsColorPickerOpen((prev) => !prev);
  };

  if (!start || !end) return;

  const startDate = `${start.getMonth() + 1}월 ${start.getDate()}일 ${day[start.getDay()]}`;
  const endDate = `${end.getMonth() + 1}월 ${end.getDate() - 1}일 ${day[end.getDay() - 1]}`;

  return (
    <ModalWrapper>
      <div className="z-[200] absolute left-[50%] top-[50%] p-[20px] translate-x-[-50%] translate-y-[-50%] w-[568px] rounded-[24px] bg-white shadow-xl">
        <div className="mt-[20px]">
          <input
            type="text"
            name="title"
            id="scheduleTit"
            placeholder="일정 제목"
            value={title}
            className="block mb-[10px] text-[28px] font-bold"
            ref={titInpRef}
            onChange={handleChangeTitleInp}
          />
          <div className="wrap_color">
            <button
              type="button"
              className="btn_colorpicker"
              onClick={handleColorBtnClick}
              style={{
                backgroundColor: `${colorPicker}`,
                ['--arrow-rotation' as string]: `${isColorPickerOpen ? '180' : '0'}deg`,
                ['--arrow-top' as string]: `${isColorPickerOpen ? '6' : '12'}px`,
              }}
            >
              컬러
            </button>
            {isColorPickerOpen && (
              <div className="box_color">
                <BlockPicker
                  triangle="hide"
                  color={colorPicker}
                  colors={[
                    '#BD83CE',
                    '#F1C6E7',
                    '#13334C',
                    '#1F6CB0',
                    '#89AC46',
                    '#F9CB43',
                    '#FBA518',
                    '#E52020',
                  ]}
                  onChangeComplete={handleColorPickerChange}
                />
              </div>
            )}
          </div>
          <div>
            <span className="sr-only">기간</span>
            <span className="inline-block my-[8px] font-bold">
              {startDate} - {endDate}
            </span>
          </div>
        </div>
        <div className="text-right">
          {prevTitle && (
            <button
              type="button"
              className="btn_delete"
              onClick={handleClickCancel}
            >
              삭제
            </button>
          )}
          <button
            type="button"
            className="btn_save"
            onClick={handleClickConfirm}
          >
            저장
          </button>
        </div>
        <button
          type="button"
          className="absolute right-[20px] top-[20px] cursor-pointer"
          onClick={handleClickConfirm}
        >
          X
        </button>
      </div>
    </ModalWrapper>
  );
};
export default ModalAddSchedule;

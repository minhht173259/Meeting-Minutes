import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import * as rdrLocales from 'react-date-range/dist/locale';
import './styles/date-picker-range.scss';
import moment from 'moment';
import ImageCalendar from './styles/calendar.jpg';

const DatePickerCustomContext = createContext();

export default function DatePickerCustom({ valueDatePicker, setValueDatePicker, title, ...restProps }) {
  const [visible, setVisible] = useState(false);

  const refDatePicker = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (refDatePicker.current && !refDatePicker.current.contains(event.target)) {
        setVisible(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DatePickerCustomContext.Provider value={{ visible, valueDatePicker, setValueDatePicker }}>
      <div className="date-picker__root" {...restProps} ref={refDatePicker}>
        <DatePickerCustom.Button onClick={() => setVisible(!visible)}> {title} </DatePickerCustom.Button>
        <DatePickerCustom.DatePicker open={visible} />
      </div>
    </DatePickerCustomContext.Provider>
  );
}

DatePickerCustom.Button = function DatePickerButton({ children, ...restProps }) {
  return (
    <div className="date-picker__button_root" {...restProps}>
      <span className="date-picker__button_content"> {children} </span>
      <img className="date-picker__button_img" src={ImageCalendar} alt="calendar" />
    </div>
  );
};

DatePickerCustom.DatePicker = function DatePickerCustomDatePicker({ ...restProps }) {
  const { visible, valueDatePicker, setValueDatePicker } = useContext(DatePickerCustomContext);

  const [datePicker, setDatePicker] = useState(
    valueDatePicker || {
      startDate: null,
      endDate: new Date(''),
      key: 'selection'
    }
  );
  const [focusedRange, setFocusRange] = useState([0, 0]);

  const handlePickerRangeDate = picker => {
    if (setValueDatePicker) {
      setValueDatePicker(picker);
    }
    setDatePicker(picker);
  };

  return (
    <div className={`hidden_date_picker ${visible ? 'date-picker__dropdown' : ''}`}>
      <div className="date-picker__lib_content">
        <span className={`date-picker__lib_content_item ${focusedRange[0] === focusedRange[1] ? 'active' : ''}`}>
          {!datePicker.startDate || Number.isNaN(datePicker.startDate.getTime())
            ? 'Ngày bắt đầu'
            : moment(datePicker.startDate).format('DD/MM/YYYY')}
        </span>
        <span> - </span>
        <span className={`date-picker__lib_content_item ${focusedRange[0] !== focusedRange[1] ? 'active' : ''}`}>
          {!datePicker.endDate || Number.isNaN(datePicker.endDate.getTime())
            ? 'Ngày kết thúc'
            : moment(datePicker.endDate).format('DD/MM/YYYY')}
        </span>
      </div>
      <DateRange
        className="date-picker__lib_picker_range"
        {...restProps}
        editableDateInputs
        onChange={item => {
          handlePickerRangeDate(item.selection);
        }}
        moveRangeOnFirstSelection={false}
        ranges={[datePicker]}
        locale={rdrLocales.vi}
        focusedRange={focusedRange}
        onRangeFocusChange={focus => {
          setFocusRange(focus);
        }}
        showSelectionPreview
      />
    </div>
  );
};

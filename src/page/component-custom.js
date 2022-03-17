import React from 'react';
import { CustomComponentStyles } from '../custom-components/date-picker-range/styles/date-picker-range';
import DatePickerCustom from '../custom-components/date-picker-range';
import SelectContainer from '../custom-components/select-custom/container';

export default function ComponentCustom() {
  return (
    <div style={{ marginLeft: '300px' }}>
      <CustomComponentStyles />
      {/* <DatePickerCustom title="Ngày tạo" />
      <DatePickerCustom title="Ngày thanh toán" /> */}
      <SelectContainer />
    </div>
  );
}

import React from 'react';
import SelectMultipleCustom from '.';

export default function SelectContainer() {
  return (
    <>
      <SelectMultipleCustom title="Trạng thái">
        <SelectMultipleCustom.Group>
          <SelectMultipleCustom.Option value="Thanh toán">Thanh toán</SelectMultipleCustom.Option>
          <SelectMultipleCustom.Option value="Chưa thanh toán">Chưa thanh toán</SelectMultipleCustom.Option>
          <SelectMultipleCustom.Option value="Hủy">Hủy</SelectMultipleCustom.Option>
        </SelectMultipleCustom.Group>
      </SelectMultipleCustom>
      <SelectMultipleCustom title="Đối tác">
        <SelectMultipleCustom.Group>
          <SelectMultipleCustom.Option value="Thanh toán">Thanh toán</SelectMultipleCustom.Option>
          <SelectMultipleCustom.Option value="Chưa thanh toán">Chưa thanh toán</SelectMultipleCustom.Option>
          <SelectMultipleCustom.Option value="Hủy">Hủy</SelectMultipleCustom.Option>
        </SelectMultipleCustom.Group>
      </SelectMultipleCustom>
    </>
  );
}

/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { Checkbox } from 'antd';
import ArrowImage from './style/Vector.png';
import './style/select-custom.scss';

const SelectMultipleCustomContext = createContext();

export default function SelectMultipleCustom({ title, children, ...restProps }) {
  const [selectValues, setSelectValues] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlerChange = values => {
    console.log('Values => ', values);
    setSelectValues(values);
  };

  return (
    <SelectMultipleCustomContext.Provider value={{ open, selectValues, handlerChange }}>
      <div {...restProps} className="select-custom__root" ref={ref}>
        <div
          className="select-custom__header"
          onClick={() => setOpen(!open)}
          onKeyDown={() => {
            console.log('OnKeyDown');
          }}
        >
          <span className="select-custom__header_title"> {title} </span>
          <img
            className={`select-custom__header_image ${open ? 'select-custom__header_image_open' : ''}`}
            src={ArrowImage}
            alt="arrow"
          />
        </div>
        {children}
      </div>
    </SelectMultipleCustomContext.Provider>
  );
}

SelectMultipleCustom.Group = function SelectMultipleCustomGroup({ children, ...restProps }) {
  const { open } = useContext(SelectMultipleCustomContext);

  return (
    <div className={`select-custom__group ${open ? 'open_group' : ''}`} {...restProps}>
      {' '}
      {children}{' '}
    </div>
  );
};

SelectMultipleCustom.Option = function SelectMultipleCustomOption({ value, children, ...restProps }) {
  const { selectValues, handlerChange } = useContext(SelectMultipleCustomContext);

  const isCheck = selectValues.find(key => key === value);

  const onChangeCheckBox = event => {
    if (event.target.checked) {
      handlerChange([...selectValues, value]);
    } else {
      const newList = selectValues.filter(item => item !== value);
      handlerChange(newList);
    }
  };

  return (
    <div key={value} className="select-custom__option" {...restProps}>
      <Checkbox name={value} checked={isCheck} onChange={onChangeCheckBox} />
      <span> {children} </span>
    </div>
  );
};

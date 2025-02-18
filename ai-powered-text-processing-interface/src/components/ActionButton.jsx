// components/ActionButton.js
import React from 'react';
import { IoIosSend } from 'react-icons/io';

const ActionButton = ({ onClick }) => {
  return (
    <span className="text-3xl float-right cursor-pointer" onClick={onClick}>
      <IoIosSend />
    </span>
  );
};

export default ActionButton;

import React from 'react';
import { IoIosSend } from "react-icons/io";

const ActionButton = ({ onClick }) => {
  return (
    <div className='text-3xl float-right cursor-pointer'>
      <IoIosSend onClick={onClick} />
    </div>
  );
};

export default ActionButton;

import React from 'react';
import { DisputeResponseType } from '../../../types/data';

const MessageCard = ({ response }: { response: DisputeResponseType }) => {
  return (
    <div
      className='bg-[#E9F6FF] px-[14px] py-[10px] flex flex-col gap-1 items-end'
      style={{
        borderRadius: '6px 6px 2px 6px',
      }}
    >
      <span className='text-sm text-[#333333]'>{response.comment}</span>
      <span className='text-xs text-[#828282] capitalize'>
        {response.user.fullname} - {new Date(response.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default MessageCard;

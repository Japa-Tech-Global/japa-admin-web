import React from 'react';
import { TicketType } from '../../types/data';
import { AttachFileIcon } from './TicketResponses/icons';

const TicketCard = ({
  selected,
  setSelected,
  data,
}: {
  selected: boolean;
  setSelected: (id: TicketType) => void;
  data: TicketType;
}) => {
  return (
    <div
      className='w-full flex items-center justify-between gap-3 cursor-pointer p-2 duration-500'
      style={{
        backgroundColor: selected ? '#E9F6FF' : 'transparent',
      }}
      onClick={() => setSelected(data)}
    >
      <div className='flex flex-col'>
        <span className='capitalize text-sm'>
          {data.fullname} - {data.subject}
        </span>
        <div className='max-w-[70%] text-sm text-[#8A8A8A]'>{data.comment}</div>
        <div className='flex gap-2 items-center'>
          {data.files.length > 0 && (
            <div className='flex items-center'>
              (<AttachFileIcon className='mr-1 h-4 w-4' />{' '}
              <span className='text-sm'>{data.files.length}</span>)
            </div>
          )}
          <span
            className='text-xs capitalize'
            style={{
              color: data.status === 'open' ? '#F20505' : '#02961A',
            }}
          >
            {data.status}
          </span>
        </div>
      </div>
      <span className='text-[#8A8A8A] text-sm'>
        {new Date(data.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default TicketCard;

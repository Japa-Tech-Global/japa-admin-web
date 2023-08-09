import React from 'react';
import { TicketResponseType, TicketType } from '../../../types/data';
import { AttachFileIcon } from './icons';
import { useAppDispatch } from '../../../store/hooks';
import { openFileViewModal } from '../../../store/slices/fileView';

const MessageCard = ({ response }: { response: TicketResponseType | TicketType }) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className='bg-[#E9F6FF] px-[14px] py-[10px] flex flex-col gap-1 items-end'
      style={{
        borderRadius: '6px 6px 2px 6px',
      }}
    >
      <span className='text-sm text-[#333333]'>{response.comment}</span>
      <span className='text-xs text-[#828282] capitalize'>
        {response.fullname} - {new Date(response.createdAt).toLocaleString()}
      </span>
      {response.files.length > 0 && (
        <button
          className='flex items-center gap-1'
          onClick={() => dispatch(openFileViewModal({ files: response.files }))}
        >
          <AttachFileIcon className='h-4 w-4' />
          <span className='text-sm'>{response.files.length}</span>
        </button>
      )}
    </div>
  );
};

export default MessageCard;

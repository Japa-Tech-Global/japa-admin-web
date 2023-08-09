import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { DisputeType } from '../../../types/data';

const InfoMenu = ({
  setOpenInfoMenu,
  selected,
}: {
  setOpenInfoMenu: (state: boolean) => void;
  selected: DisputeType;
}) => {
  return (
    <ClickAwayListener onClickAway={() => setOpenInfoMenu(false)}>
      <div className='w-60 max-w-xs bg-white shadow-md p-5 rounded absolute top-8 left-0'>
        <p className='text-sm text-[#999] mb-5'>Ticket Info</p>
        <div className='flex flex-col gap-3'>
          {selected.user.email && (
            <span className='text-xs'>Email : {selected.user.email}</span>
          )}
          {selected.user.phone && (
            <span className='text-xs'>Phone : {selected.user.phone}</span>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default InfoMenu;

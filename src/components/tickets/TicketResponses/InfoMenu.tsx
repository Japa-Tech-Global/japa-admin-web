import React from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { TicketType } from '../../../types/data';

const InfoMenu = ({
  setOpenInfoMenu,
  selected,
}: {
  setOpenInfoMenu: (state: boolean) => void;
  selected: TicketType;
}) => {
  return (
    <ClickAwayListener onClickAway={() => setOpenInfoMenu(false)}>
      <div className='w-60 max-w-xs bg-white shadow-md p-5 rounded absolute top-8 left-0'>
        <p className='text-sm text-[#999] mb-5'>Ticket Info</p>
        <div className='flex flex-col gap-3'>
          {selected.liveChat && <span className='text-red-500 text-xs'>Live</span>}

          {selected.email && <span className='text-xs'>Email : {selected.email}</span>}
          {selected.phone && <span className='text-xs'>Phone : {selected.phone}</span>}
          {selected.attendingStaff && Object.keys(selected.attendingStaff).length && (
            <span className='text-xs'>
              <b className='capitalize'>{selected.attendingStaff.fullname}</b> is
              attending to this
            </span>
          )}
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default InfoMenu;

import { useState } from 'react';
import InfoIcon from '../../../assets/icons/Info.svg';
import InfoMenu from './InfoMenu';
import { DisputeType } from '../../../types/data';

const InfoHeader = ({
  selected,
  loading,
}: {
  selected: DisputeType;
  loading: boolean;
}) => {
  const [openInfoMenu, setOpenInfoMenu] = useState(false);

  return (
    <div className='border-b p-4 sticky top-0 bg-white z-[1]'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-3'>
          <img
            src={InfoIcon}
            alt='Info'
            className='h-7 cursor-pointer'
            onClick={() => setOpenInfoMenu(true)}
          />
        </div>
        {loading && <span className='italic text-xs'>Fetching responses</span>}
      </div>

      {openInfoMenu && (
        <div className='relative'>
          <InfoMenu setOpenInfoMenu={setOpenInfoMenu} selected={selected} />
        </div>
      )}
    </div>
  );
};

export default InfoHeader;

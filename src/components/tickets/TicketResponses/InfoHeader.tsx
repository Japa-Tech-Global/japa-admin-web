import { useState } from 'react';
import InfoIcon from '../../../assets/icons/Info.svg';
import EditIcon from '../../../assets/icons/edit.svg';
import InfoMenu from './InfoMenu';
import { TicketType } from '../../../types/data';
import UpdateModal from './UpdateModal';
import { AttachFileIcon } from './icons';
import { useAppDispatch } from '../../../store/hooks';
import { openFileViewModal } from '../../../store/slices/fileView';

const InfoHeader = ({
  selected,
  reload,
}: {
  selected: TicketType;
  reload: () => void;
}) => {
  const [openInfoMenu, setOpenInfoMenu] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const dispatch = useAppDispatch();

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
          {selected.files && selected.files.length > 0 && (
            <button
              className='flex items-end cursor-pointer'
              onClick={() => dispatch(openFileViewModal({ files: selected.files }))}
            >
              <AttachFileIcon className='h-7' />
              <span className='text-xs'>{selected.files.length}</span>
            </button>
          )}
        </div>
        <img
          src={EditIcon}
          alt='Edit'
          className='h-7 cursor-pointer'
          onClick={() => setUpdateModal(true)}
        />
      </div>

      {openInfoMenu && (
        <div className='relative'>
          <InfoMenu setOpenInfoMenu={setOpenInfoMenu} selected={selected} />
        </div>
      )}

      <UpdateModal
        open={updateModal}
        closeModal={() => setUpdateModal(false)}
        reload={reload}
        selected={selected}
      />
    </div>
  );
};

export default InfoHeader;

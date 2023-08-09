import CustomModal from '../../common/CustomModal/CustomModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { closeFileViewModal } from '../../store/slices/fileView';

function FileViewModal() {
  const { open, files } = useAppSelector((state) => state.fileView);
  const dispatch = useAppDispatch();
  return (
    <CustomModal
      modalState={open}
      closeModal={() => dispatch(closeFileViewModal())}
      shouldCloseOnOverlayClick
      title='Files'
    >
      <div className='grid gap-3 grid-cols-1 md:grid-cols-2'>
        {files && files.length ? (
          files.map((file) => (
            <img
              alt='File'
              src={file}
              className='w-full h-full max-h-[300px] object-cover'
            />
          ))
        ) : (
          <>No file found</>
        )}
      </div>
    </CustomModal>
  );
}

export default FileViewModal;

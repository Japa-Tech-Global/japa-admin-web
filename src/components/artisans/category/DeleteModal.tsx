import React, { useState } from 'react';
import CustomModal from '../../../common/CustomModal/CustomModal';
import Button from '../../../common/Button';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';

interface Props {
  id: string;
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function DeleteModal({ closeModal, id, reload, open }: Props) {
  const [loading, setLoading] = useState(false);

  const deleteItem = async () => {
    try {
      setLoading(true);
      const response = await appAxios.delete(`/delete/artisan-category/${id}`);
      closeModal();
      reload();
      sendFeedback(response.data?.message, 'success');
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal
      modalState={open}
      closeModal={closeModal}
      title='Delete from Waiting list'
    >
      <p>Are you sure you want to delete this category?</p>
      <div className='flex items-center justify-start mt-10 gap-5'>
        <Button
          className='!max-w-[200px] !bg-error'
          loading={loading}
          onClick={deleteItem}
        >
          Yes, delete
        </Button>
        <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
          No, cancel
        </Button>
      </div>
    </CustomModal>
  );
}

export default DeleteModal;

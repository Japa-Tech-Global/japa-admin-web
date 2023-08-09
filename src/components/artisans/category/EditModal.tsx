import React, { useEffect, useState } from 'react';
import CustomModal from '../../../common/CustomModal/CustomModal';
import Button from '../../../common/Button';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../../common/LabelInput/LabelInput';
import { ArtisanCategoryType } from '../../../types/data';

interface Props {
  closeModal: () => void;
  reload: () => void;
  id: string;
  open: boolean;
}

function EditModal({ closeModal, reload, id, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<ArtisanCategoryType | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/artisan-category/' + id);
        setDetails(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      getItem();
    }
  }, [open, id]);

  const formik = useFormik({
    initialValues: {
      name: details?.name,
      description: details?.description,
      services: details?.services?.join(', '),
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object({
      name: yup.string().required('Required'),
      description: yup.string().required('Required'),
      services: yup.string().required('Required'),
    }),
    enableReinitialize: true,
  });

  const submitValues = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/artisan/category`, {
        name: formik.values.name,
        description: formik.values.description,
        services: formik.values.services?.split(',')?.map((element) => element?.trim()),
        categoryId: details?._id,
      });
      closeModal();
      reload();
      formik.resetForm();
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
      title='Update Artisan Category'
    >
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput formik={formik} name='name' label='Name' className='mb-6' />
        <LabelInput
          formik={formik}
          name='description'
          label='Description'
          className='mb-6'
        />
        <LabelInput
          formik={formik}
          name='services'
          label='Services'
          className='mb-6'
          hint='Separate items by a comma'
        />
        <div className='flex items-center justify-start mt-10 gap-5'>
          <Button className='!max-w-[200px]' loading={loading} type='submit'>
            Update Category
          </Button>
          <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default EditModal;

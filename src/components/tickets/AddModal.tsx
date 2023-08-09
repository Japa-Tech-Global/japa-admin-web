import React, { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import Button from '../../common/Button';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LabelInput from '../../common/LabelInput/LabelInput';
import Dropdown from '../../common/Dropdown/Dropdown';
import { AdminType } from '../../types/data';

interface Props {
  closeModal: () => void;
  reload: () => void;
  open: boolean;
}

function AddModal({ closeModal, reload, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [allAdmins, setAllAdmin] = useState<AdminType[]>([]);

  const formik = useFormik({
    initialValues: {
      subject: '',
      comment: '',
      responseFiles: [],
      assignAdmin: false,
      selectedAdmin: '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object().shape({
      subject: yup.string().required('Subject is required'),
      comment: yup.string().required('Full name is required'),
    }),
  });

  const submitValues = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('subject', formik.values.subject);
      formData.append('comment', formik.values.comment);

      if (formik.values.responseFiles.length) {
        formik.values.responseFiles.map((file) => formData.append('files', file));
      }

      if (formik.values.assignAdmin) {
        if (!formik.values.selectedAdmin) {
          return sendFeedback('Please select an admin', 'error');
        }
        formData.append('recipient', 'admin');
        formData.append('recipientId', formik.values.selectedAdmin);
      }

      const response = await appAxios.post(`/tickets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      closeModal();
      reload();
      sendFeedback(response.data?.message, 'success');
      formik.resetForm();
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllAdmins = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/admin`);
      setAllAdmin(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (formik.values.assignAdmin) {
      getAllAdmins();
    }
  }, [formik.values.assignAdmin]);

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Create Ticket'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <LabelInput formik={formik} name='subject' label='Subject' className='mb-6' />
        <LabelInput formik={formik} name='comment' label='Comment' className='mb-6' />
        <Dropdown
          values={[
            {
              label: 'Yes',
              value: true,
            },
            {
              label: 'No',
              value: false,
            },
          ]}
          label='Assign to Admin'
          name='assignAdmin'
          defaultValue={{
            label: formik.values.assignAdmin ? 'Yes' : 'No',
            value: formik.values.assignAdmin,
          }}
          formik={formik}
          className='mb-5'
          placeholder='Assign to Admin'
        />
        {formik.values.assignAdmin && (
          <Dropdown
            values={
              (allAdmins &&
                allAdmins.length &&
                allAdmins.map((admin) => ({
                  label: admin.fullname,
                  value: admin._id,
                }))) ||
              []
            }
            label='Select Admin'
            name='selectedAdmin'
            formik={formik}
            className='mb-5 capitalize'
            placeholder='Select Admin'
          />
        )}

        <div className='flex flex-col gap-3 mb-6'>
          <label htmlFor='responseFiles'>Files (optional)</label>
          <input
            type='file'
            name='responseFiles'
            id='responseFiles'
            multiple
            accept='image/*'
            onChange={(e: any) => {
              const file = Array.prototype.slice.call(e.target.files);
              formik.setFieldValue('responseFiles', file);
            }}
          />
        </div>

        <div className='flex items-center justify-start mt-10 gap-5'>
          <Button className='!max-w-[200px]' loading={loading} type='submit'>
            Create
          </Button>
          <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default AddModal;

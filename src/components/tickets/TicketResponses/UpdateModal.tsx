import React, { useEffect, useMemo, useState } from 'react';
import Button from '../../../common/Button';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CustomModal from '../../../common/CustomModal/CustomModal';
import { AdminType, TicketType } from '../../../types/data';
import Dropdown from '../../../common/Dropdown/Dropdown';

interface Props {
  closeModal: () => void;
  open: boolean;
  reload: () => void;
  selected: TicketType;
}

function UpdateModal({ closeModal, open, reload, selected }: Props) {
  const [loading, setLoading] = useState(false);
  const [allAdmins, setAllAdmin] = useState<AdminType[]>([]);

  const formik = useFormik({
    initialValues: {
      status: selected.status,
      assignAdmin:
        selected.attendingStaff && Object.keys(selected.attendingStaff).length
          ? true
          : false,
      selectedAdmin: selected.attendingStaff?._id || '',
    },
    onSubmit: () => {
      submitValues();
    },
    validationSchema: yup.object().shape({
      status: yup.string().required('Status is required'),
    }),
  });

  const selectedAdminDetails = useMemo(
    () => allAdmins.find((admin) => admin._id === formik.values.selectedAdmin),
    [formik.values.selectedAdmin, allAdmins]
  );

  const submitValues = async () => {
    try {
      setLoading(true);

      const response = await appAxios.patch(`/tickets/update`, {
        ticketId: selected._id,
        status: formik.values.status,
        ...(formik.values.assignAdmin
          ? {
              recipient: 'admin',
              recipientId: formik.values.selectedAdmin,
            }
          : {}),
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
    <CustomModal modalState={open} closeModal={closeModal} title='Update Ticket'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <Dropdown
          values={[
            {
              label: 'Open',
              value: 'open',
            },
            {
              label: 'Closed',
              value: 'closed',
            },
          ]}
          label='Status'
          name='status'
          defaultValue={{
            label: formik.values.status,
            value: formik.values.status,
          }}
          formik={formik}
          className='mb-5 capitalize'
          placeholder='Status'
        />
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
            defaultValue={{
              label: selectedAdminDetails?.fullname || '',
              value: formik.values.selectedAdmin,
            }}
            className='mb-5 capitalize'
            placeholder='Select Admin'
          />
        )}

        <div className='flex items-center justify-start mt-10 gap-5'>
          <Button className='!max-w-[200px]' loading={loading} type='submit'>
            Update
          </Button>
          <Button className='!max-w-[200px] !bg-grey !text-[#333]' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </form>
    </CustomModal>
  );
}

export default UpdateModal;

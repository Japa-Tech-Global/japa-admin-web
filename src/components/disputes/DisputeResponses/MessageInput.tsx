import { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import { AttachFileIcon, SendIcon } from './icons';
import { useFormik } from 'formik';
import { sendCatchFeedback, sendFeedback } from '../../../functions/feedback';
import LoadingIndicator from '../../../common/LoadingIndicator';
import TextArea from '../../../common/TextArea/TextArea';
import { DisputeType } from '../../../types/data';

const MessageInput = ({
  selected,
  reload,
}: {
  selected: DisputeType;
  reload: () => void;
}) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      message: '',
      responseFiles: [],
    },
    onSubmit: () => {
      submitValues();
    },
  });

  const submitValues = async () => {
    if (!formik.values.message) {
      return sendFeedback('Enter a message', 'error');
    }
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('disputeId', selected._id);
      formData.append('booking', selected.booking);
      formData.append('comment', formik.values.message);

      if (formik.values.responseFiles.length) {
        formik.values.responseFiles.map((file) => formData.append('files', file));
      }

      const response = await appAxios.post('/dispute/respond', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      sendFeedback(response.data?.message, 'success');
      reload();
      formik.resetForm();
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form when selected ticket changes
  useEffect(() => {
    formik.resetForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected._id]);

  return (
    <div className='sticky bottom-0 z-[1] bg-white'>
      <div className='p-4'>
        <div className='border border-black p-2 rounded-[11px]'>
          <form className='flex flex-col w-full gap-4' onSubmit={formik.handleSubmit}>
            <TextArea
              name='message'
              formik={formik}
              rows={1}
              style={{
                outline: 'none',
                border: 'none',
                resize: 'none',
              }}
              placeholder='Write a message...'
            />
            <div className='flex justify-between items-center'>
              {/* Controls */}
              <input
                type='file'
                name='responseFiles'
                id='responseFiles'
                multiple
                hidden
                accept='image/*'
                onChange={(e: any) => {
                  const file = Array.prototype.slice.call(e.target.files);
                  formik.setFieldValue('responseFiles', file);
                }}
              />
              <button
                type='button'
                onClick={() => document.getElementById('responseFiles')?.click()}
                className='flex items-end'
              >
                <AttachFileIcon className='h-6 w-6' />
                {formik.values.responseFiles?.length > 0 && (
                  <span className='text-sm'>{formik.values.responseFiles.length}</span>
                )}
              </button>
              {loading ? (
                <LoadingIndicator size={24} />
              ) : (
                <button type='submit' disabled={!formik.values.message}>
                  <SendIcon className='h-6 w-6' />
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;

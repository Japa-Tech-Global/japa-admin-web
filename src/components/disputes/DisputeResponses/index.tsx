import { useEffect, useState } from 'react';
import InfoHeader from './InfoHeader';
import { DisputeResponseType, DisputeType } from '../../../types/data';
import Messages from './Messages';
import { sendCatchFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import MessageInput from './MessageInput';

const DisputeResponses = ({ selected }: { selected: DisputeType }) => {
  const [responses, setResponses] = useState<DisputeResponseType[]>([]);
  const [loading, setLoading] = useState(false);

  const getResponses = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('all/dispute-response', {
        disputeId: selected._id,
      });
      setResponses(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selected._id) {
      getResponses();

      let responseInterval = setInterval(() => getResponses(), 30000);
      return () => {
        clearInterval(responseInterval);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  // scroll to end
  useEffect(() => {
    const element: HTMLElement | null = window.document.getElementById('responses');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }, [loading]);

  return (
    <div
      className='bg-white overflow-y-auto h-[70vh] min-h-[70vh] relative'
      style={{
        boxShadow: '0px 4px 4px 0px rgba(240, 240, 240, 0.06)',
      }}
      id='responses'
    >
      <InfoHeader selected={selected} loading={loading} />
      {/* Message Section */}
      <Messages responses={responses} selected={selected} />
      <MessageInput selected={selected} reload={getResponses} />
    </div>
  );
};

export default DisputeResponses;

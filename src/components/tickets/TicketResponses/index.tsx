import { useEffect, useState } from 'react';
import InfoHeader from './InfoHeader';
import { TicketResponseType, TicketType } from '../../../types/data';
import Messages from './Messages';
import { sendCatchFeedback } from '../../../functions/feedback';
import { appAxios } from '../../../api/axios';
import MessageInput from './MessageInput';

const TicketResponses = ({
  selected,
  reload,
}: {
  selected: TicketType;
  reload: () => void;
}) => {
  const [responses, setResponses] = useState<TicketResponseType[]>([]);
  const [loading, setLoading] = useState(false);

  const getResponses = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post('all/ticket-response', {
        ticketId: selected._id,
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
      <InfoHeader selected={selected} reload={reload} />
      {/* Message Section */}
      <Messages loading={loading} responses={responses} selected={selected} />
      <MessageInput selected={selected} reload={getResponses} />
    </div>
  );
};

export default TicketResponses;

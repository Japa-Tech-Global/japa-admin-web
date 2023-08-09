import { useEffect } from 'react';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import { DisputeType } from '../../types/data';

const TicketCard = ({
  selected,
  setSelected,
  data,
}: {
  selected: boolean;
  setSelected: (id: DisputeType) => void;
  data: DisputeType;
}) => {
  useEffect(() => {
    const joinDispute = async () => {
      try {
        await appAxios.patch('/dispute/join', {
          disputeId: data._id,
        });
      } catch (error) {
        sendCatchFeedback(error);
      }
    };
    if (selected) {
      joinDispute();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div
      className='w-full flex items-start justify-between gap-3 cursor-pointer p-2 duration-500'
      style={{
        backgroundColor: selected ? '#E9F6FF' : 'transparent',
      }}
      onClick={() => setSelected(data)}
    >
      <div className='flex flex-col'>
        <span className='capitalize text-sm'>
          {data.user.fullname} disputed {data.artisan.companyName}
        </span>
        <div className='flex gap-2 items-center'>
          <span
            className='text-xs capitalize'
            style={{
              color: data.status === 'open' ? '#F20505' : '#02961A',
            }}
          >
            {data.status === 'open' ? 'In Dispute' : 'Dispute closed'}
          </span>
        </div>
      </div>
      <span className='text-[#8A8A8A] text-sm'>
        {new Date(data.createdAt).toLocaleString()}
      </span>
    </div>
  );
};

export default TicketCard;

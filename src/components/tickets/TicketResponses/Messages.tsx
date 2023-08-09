import LoadingIndicator from '../../../common/LoadingIndicator';
import { TicketResponseType, TicketType } from '../../../types/data';
import MessageCard from './MessageCard';

const Messages = ({
  loading,
  responses,
  selected,
}: {
  loading: boolean;
  responses: TicketResponseType[];
  selected: TicketType;
}) => {
  return (
    <div className='min-h-[42vh]'>
      <div className='text-center bg-white p-3 text-xs text-[#8A8A8A]'>
        {new Date(selected.createdAt).toLocaleString()}
      </div>
      <div className='py-[25px] px-1 flex flex-col items-end w-full gap-[22px] '>
        <MessageCard response={selected} />
      </div>

      {loading ? (
        <>
          <LoadingIndicator />
        </>
      ) : responses && responses.length ? (
        <div className='py-[25px] px-1 flex flex-col items-end w-full gap-[22px] '>
          {responses.map((response) => (
            <MessageCard response={response} key={response._id} />
          ))}
        </div>
      ) : (
        <div className='text-center text-error'>No response</div>
      )}
    </div>
  );
};

export default Messages;

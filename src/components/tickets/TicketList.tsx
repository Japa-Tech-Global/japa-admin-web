import { TicketType } from '../../types/data';
import TicketCard from './TicketCard';

const TicketList = ({
  selected,
  setSelected,
  allData,
}: {
  selected: TicketType | null;
  setSelected: (id: TicketType) => void;
  allData: TicketType[];
}) => {
  return (
    <div className='flex flex-col gap-[22px] border border-[#E6E6E6] rounded py-4 h-[70vh] overflow-y-auto'>
      {allData.map((data) => (
        <TicketCard
          key={data._id}
          selected={selected?._id === data._id}
          setSelected={setSelected}
          data={data}
        />
      ))}
    </div>
  );
};

export default TicketList;

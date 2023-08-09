import { DisputeType } from '../../types/data';
import DisputeCard from './DisputeCard';

const DisputeList = ({
  selected,
  setSelected,
  allData,
}: {
  selected: DisputeType | null;
  setSelected: (id: DisputeType) => void;
  allData: DisputeType[];
}) => {
  return (
    <div className='flex flex-col gap-[22px] border border-[#E6E6E6] rounded py-4 h-[70vh] overflow-y-auto'>
      {allData.map((data) => (
        <DisputeCard
          key={data._id}
          selected={selected?._id === data._id}
          setSelected={setSelected}
          data={data}
        />
      ))}
    </div>
  );
};

export default DisputeList;

import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import PageHeader from '../../layout/PageLayout/PageHeader';
import LoadingIndicator from '../../common/LoadingIndicator';
import { DisputeType } from '../../types/data';
import DisputeList from '../../components/disputes/DisputeList';
import DisputeResponses from '../../components/disputes/DisputeResponses';

function Disputes() {
  const [allData, setAllData] = useState<DisputeType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<DisputeType | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/dispute`);
      setAllData(response.data?.data);
    } catch (error) {
      sendCatchFeedback(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  // When update is done, this updates the selected ticket
  useEffect(() => {
    setSelected((oldState) => allData.find((data) => data._id === oldState?._id) || null);
  }, [allData]);

  return (
    <AppLayout>
      {/* Added 50px because of top and bottom margin of 25px each with the height of the nav:80px */}
      <div className='md:h-[calc(100vh-80px-50px)] relative overflow-y-auto'>
        <PageHeader title='Disputes' />
        {loading ? (
          <LoadingIndicator />
        ) : allData && allData.length ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:absolute md:bottom-0 md:left-0 md:right-0 '>
            <DisputeList
              selected={selected}
              setSelected={setSelected}
              allData={allData}
            />
            {selected && <DisputeResponses selected={selected} />}
          </div>
        ) : (
          <>No Dispute Found</>
        )}
      </div>
    </AppLayout>
  );
}

export default Disputes;

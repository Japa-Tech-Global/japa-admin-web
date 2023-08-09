import { useEffect, useState } from 'react';
import Button from '../../common/Button';
import AppLayout from '../../layout/AppLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import PageHeader from '../../layout/PageLayout/PageHeader';
import LoadingIndicator from '../../common/LoadingIndicator';
import { TicketType } from '../../types/data';
import TicketList from '../../components/tickets/TicketList';
import TicketResponses from '../../components/tickets/TicketResponses';
import AddModal from '../../components/tickets/AddModal';
import FileViewModal from '../../components/tickets/FileViewModal';

function Tickets() {
  const [allData, setAllData] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<TicketType | null>(null);
  const [addModal, setAddModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/ticket`);
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
        <PageHeader
          title='Tickets'
          pageActions={
            <Button className='!w-fit !h-12' onClick={() => setAddModal(true)}>
              Create Ticket
            </Button>
          }
        />
        {loading ? (
          <LoadingIndicator />
        ) : allData && allData.length ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:absolute md:bottom-0 md:left-0 md:right-0 '>
            <TicketList selected={selected} setSelected={setSelected} allData={allData} />
            {selected && (
              <TicketResponses
                selected={selected}
                reload={() => {
                  getData();
                }}
              />
            )}
          </div>
        ) : (
          <>No Ticket Found</>
        )}
      </div>
      <AddModal open={addModal} closeModal={() => setAddModal(false)} reload={getData} />
      <FileViewModal />
    </AppLayout>
  );
}

export default Tickets;

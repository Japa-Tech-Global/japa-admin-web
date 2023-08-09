import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import DeleteModal from '../../components/waiting-list/DeleteModal';

function WaitingList() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selected, setSelected] = useState('');

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/waiting-list`);
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

  const tableHeaders = ['email', 'createdAt', '_id'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Waiting List'
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'Delete from list',
              onClick: (id) => {
                setSelected(id);
                setOpenDeleteModal(true);
              },
              style: {
                color: '#FF0000',
              },
            },
          ],
        }}
      />
      <DeleteModal
        open={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        id={selected}
        reload={getData}
      />
    </AppLayout>
  );
}

export default WaitingList;

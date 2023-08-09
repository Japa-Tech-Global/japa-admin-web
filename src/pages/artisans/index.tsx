import { useEffect, useState } from 'react';
import AppLayout from '../../layout/AppLayout';
import PageLayout from '../../layout/PageLayout';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import ViewModal from '../../components/artisans/ViewModal';
import ToggleActiveModal from '../../components/artisans/ToggleActiveModal';
import TogglePermissionsModal from '../../components/artisans/TogglePermissionsModal';

function Artisans() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [toggleActiveModal, setToggleActiveModal] = useState(false);
  const [togglePermissionsModal, setTogglePermissionsModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/artisan`);
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

  const tableHeaders = [
    'fullname',
    'companyName',
    'email',
    'phone',
    'createdAt',
    'isVerified',
    'isActive',
    '_id',
  ];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Artisans'
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'View Artisan',
              onClick: (id) => {
                setSelected(id);
                setViewModal(true);
              },
            },
            {
              label: 'Change Permissions',
              onClick: (id) => {
                setSelected(id);
                setTogglePermissionsModal(true);
              },
            },
            {
              label: 'Change Active Status',
              onClick: (id) => {
                setSelected(id);
                setToggleActiveModal(true);
              },
            },
          ],
        }}
      />

      <ViewModal open={viewModal} closeModal={() => setViewModal(false)} id={selected} />
      <ToggleActiveModal
        open={toggleActiveModal}
        closeModal={() => setToggleActiveModal(false)}
        id={selected}
        reload={getData}
      />
      <TogglePermissionsModal
        open={togglePermissionsModal}
        closeModal={() => setTogglePermissionsModal(false)}
        id={selected}
        reload={getData}
      />
    </AppLayout>
  );
}

export default Artisans;

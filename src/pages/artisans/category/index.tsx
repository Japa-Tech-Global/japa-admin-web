import React, { useEffect, useState } from 'react';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback } from '../../../functions/feedback';
import AppLayout from '../../../layout/AppLayout';
import PageLayout from '../../../layout/PageLayout';
import Button from '../../../common/Button';
import AddModal from '../../../components/artisans/category/AddModal';
import EditModal from '../../../components/artisans/category/EditModal';
import DeleteModal from '../../../components/artisans/category/DeleteModal';

const ArtisanCategory = () => {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/artisan-category`);
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

  const tableHeaders = ['name', 'description', 'services', '_id'];
  return (
    <AppLayout>
      <PageLayout
        pageTitle='Artisan Categories'
        pageActions={
          <Button
            style={{ width: 'fit-content', height: 48 }}
            onClick={() => setAddModal(true)}
          >
            Add new category
          </Button>
        }
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
          menuItems: [
            {
              label: 'Edit Category',
              onClick: (id) => {
                setSelected(id);
                setEditModal(true);
              },
            },
            {
              label: 'Delete Category',
              onClick: (id) => {
                setSelected(id);
                setDeleteModal(true);
              },
              style: {
                color: '#FF0000',
              },
            },
          ],
        }}
      />
      <AddModal open={addModal} closeModal={() => setAddModal(false)} reload={getData} />
      <EditModal
        open={editModal}
        closeModal={() => setEditModal(false)}
        id={selected}
        reload={getData}
      />
      <DeleteModal
        open={deleteModal}
        closeModal={() => setDeleteModal(false)}
        reload={getData}
        id={selected}
      />
    </AppLayout>
  );
};

export default ArtisanCategory;

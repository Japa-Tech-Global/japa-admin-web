import { useEffect, useState } from 'react';
import AppLayout from '../../../layout/AppLayout';
import PageLayout from '../../../layout/PageLayout';
import { appAxios } from '../../../api/axios';
import { sendCatchFeedback } from '../../../functions/feedback';

function CustomerRatings() {
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await appAxios.post(`/all/user-rating`);
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

  const tableHeaders = ['userId', 'rating', 'review', 'createdAt', 'artisan'];

  return (
    <AppLayout>
      <PageLayout
        pageTitle='Customer Ratings'
        tableProps={{
          loading,
          tableHeaders,
          data: allData,
        }}
      />
    </AppLayout>
  );
}

export default CustomerRatings;

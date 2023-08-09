import { useEffect, useState } from 'react';
import CustomModal from '../../common/CustomModal/CustomModal';
import { appAxios } from '../../api/axios';
import { sendCatchFeedback } from '../../functions/feedback';
import LoadingIndicator from '../../common/LoadingIndicator';
import {
  ArtisanType,
  ArtisanPermissionType,
  ArtisanBusinessHoursType,
  ArtisanRatingType,
  ArtisanViewType,
} from '../../types/data';
import Rating from '../../common/Rating';

interface Props {
  closeModal: () => void;
  open: boolean;
  id: string;
}

function ViewModal({ closeModal, id, open }: Props) {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<ArtisanType | null>(null);
  const [businessHours, setBusinessHours] = useState<ArtisanBusinessHoursType | null>(
    null
  );
  const [rating, setRating] = useState<ArtisanRatingType | null>(null);
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const getItem = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/artisan/' + id);
        setDetails(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    const getBusinessHours = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/business-hours/' + id);
        setBusinessHours(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    const getRating = async () => {
      setLoading(true);
      try {
        const response = await appAxios.get('/single/rating/' + id);
        setRating(response.data?.data);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    const getViews = async () => {
      setLoading(true);
      try {
        const response = await appAxios.post('/all/view');
        // It's returning all the user views so I'll filter
        // for the specific artisan and then add all the views together
        const allViews: ArtisanViewType[] = response.data?.data;
        const artisanViews = allViews.filter((view) => view.artisan === id);
        const artisanViewCount = artisanViews.reduce((a, b) => a + b.views, 0);
        setViews(artisanViewCount);
      } catch (error) {
        sendCatchFeedback(error);
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      getItem();
      getBusinessHours();
      getRating();
      getViews();
    }
  }, [open, id]);

  const getPermissionsList = (permissions: ArtisanPermissionType) => {
    return (
      Object.keys(permissions)
        .map((key) => {
          if (permissions[key as keyof typeof permissions]) {
            return key;
          }
          return null;
        })
        .filter((item) => item)
        .join(', ') || 'None'
    );
  };

  return (
    <CustomModal modalState={open} closeModal={closeModal} title='Artisan Details'>
      {loading ? (
        <LoadingIndicator />
      ) : details && Object.keys(details).length ? (
        <>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Company Name:</b> {details.companyName}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>FullName:</b> {details.fullname}
          </p>
          {rating && (
            <div className='mb-3 pb-2 border-b-2 flex items-center gap-2'>
              <b>Rating:</b> <Rating rating={rating.rating} />
            </div>
          )}
          {views && (
            <p className='mb-3 pb-2 border-b-2'>
              <b>Views:</b> {views}
            </p>
          )}
          <p className='mb-3 pb-2 border-b-2'>
            <b>Email:</b> {details.email}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Phone:</b> {details.phone}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Country:</b> {details.country}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Verified:</b> {details.isVerified ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Active:</b> {details.isActive ? 'Yes' : 'No'}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Registered:</b> {new Date(details.createdAt).toDateString()}
          </p>
          <p className='capitalize mb-3 pb-2 border-b-2'>
            <b>Permissions:</b> {getPermissionsList(details.userPermissions)}
          </p>
          {businessHours && Object.keys(businessHours).length && (
            <>
              <p className='uppercase mb-3 pb-2'>
                <b>Business Hours</b>
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Monday:</b> {businessHours.monday?.openTime} -{' '}
                {businessHours.monday?.closeTime}
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Tuesday:</b> {businessHours.tuesday?.openTime} -{' '}
                {businessHours.tuesday?.closeTime}
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Wednesday:</b> {businessHours.wednesday?.openTime} -{' '}
                {businessHours.wednesday?.closeTime}
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Thursday:</b> {businessHours.thursday?.openTime} -{' '}
                {businessHours.thursday?.closeTime}
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Friday:</b> {businessHours.friday?.openTime} -{' '}
                {businessHours.friday?.closeTime}
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Saturday:</b> {businessHours.saturday?.openTime} -{' '}
                {businessHours.saturday?.closeTime}
              </p>
              <p className='capitalize mb-3 pb-2'>
                <b>Sunday:</b> {businessHours.sunday?.openTime} -{' '}
                {businessHours.sunday?.closeTime}
              </p>
            </>
          )}
        </>
      ) : (
        <>No detail found</>
      )}
    </CustomModal>
  );
}

export default ViewModal;

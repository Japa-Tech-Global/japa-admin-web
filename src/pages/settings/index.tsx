import React from 'react';
import AppLayout from '../../layout/AppLayout';
import PageHeader from '../../layout/PageLayout/PageHeader';
import ProfileImage from '../../components/settings/ProfileImage';
import Notification from '../../components/settings/Notification';
import Profile from '../../components/settings/Profile';
import Password from '../../components/settings/Password';

const Settings = () => {
  return (
    <AppLayout>
      <PageHeader title='Settings' />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <ProfileImage />
        <Password />
        <Profile />
        <Notification />
      </div>
    </AppLayout>
  );
};

export default Settings;

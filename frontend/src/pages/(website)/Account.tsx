import ActiveLastBreadcrumb from './components/common/components/Link';
import { Link } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

import { useState, useEffect } from 'react';
import i18n from './components/common/components/LangConfig';

const Account = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [setCurrentPassword] = useState('');
  const [setNewPassword] = useState('');
  const [setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mx-4 md:ml-36 mt-48 gap-20 justify-center md:justify-between ">
      <div className="flex justify-between   flex-col gap-4 md:flex-row ">
        <ActiveLastBreadcrumb
          path={`${i18n.t('accountPage.home')}/ ${i18n.t(
            'accountPage.myAccount',
          )}`}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-28 justify-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col py-10 md:px-20 px-5">
  <div className="flex flex-col gap-8 md:w-[710px] mx-auto">
    <span className="text-2xl font-semibold text-red-600 text-center">
      {i18n.t('accountPage.editYourProfile')}
    </span>
    
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-col w-full">
        <label className="text-base font-medium text-gray-700 mb-2">
          {i18n.t('accountPage.firstName')}
        </label>
        <input
          type="text"
          placeholder={firstName ? firstName : 'Your First Name'}
          required
          onChange={(e) => setFirstName(e.target.value)}
          className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      
      <div className="flex flex-col w-full">
        <label className="text-base font-medium text-gray-700 mb-2">
          {i18n.t('accountPage.lastName')}
        </label>
        <input
          type="text"
          placeholder={lastName ? lastName : 'Your Last Name'}
          required
          onChange={(e) => setLastName(e.target.value)}
          className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
    </div>
    
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex flex-col w-full">
        <label className="text-base font-medium text-gray-700 mb-2">
          {i18n.t('accountPage.email')}
        </label>
        <input
          type="email"
          placeholder={email ? email : 'Your Email'}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
      
      <div className="flex flex-col w-full">
        <label className="text-base font-medium text-gray-700 mb-2">
          {i18n.t('accountPage.address')}
        </label>
        <input
          type="text"
          placeholder={address ? address : 'Your Address'}
          required
          onChange={(e) => setAddress(e.target.value)}
          className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
        />
      </div>
    </div>
    
    <div className="flex flex-col gap-6">
      <label className="text-base font-medium text-gray-700 mb-2">
        {i18n.t('accountPage.passwordChanges')}
      </label>
      <input
        type="password"
        placeholder={i18n.t('accountPage.currentPassword')}
        required
        className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        type="password"
        placeholder={i18n.t('accountPage.newPassword')}
        required
        className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      />
      <input
        type="password"
        placeholder={i18n.t('accountPage.confirmPassword')}
        required
        className="rounded-lg border-gray-300 shadow-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
      />
    </div>
    
    <div className="flex justify-center gap-6 mt-6">
      <button
        onClick={() => {
          setFirstName('');
          setLastName('');
          setEmail('');
          setAddress('');
        }}
        className="text-gray-500 hover:text-gray-700 transition ease-in-out duration-300"
      >
        {i18n.t('accountPage.cancel')}
      </button>
      <button className="bg-red-600 text-white text-lg px-6 py-3 rounded-lg shadow-md hover:bg-red-500 transition ease-in-out duration-300">
        {i18n.t('accountPage.saveChanges')}
      </button>
    </div>
  </div>
</div>

      </div>
      {/* Snackbar for displaying success or error messages */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error ? error : message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Account;

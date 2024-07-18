import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import SignImg from './SignImg.png';

import i18n from './components/common/components/LangConfig.tsx';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex max-lg:flex-col-reverse justify-center  md:justify-start items-center mb-36 gap-12 lg:mt-28 xl:gap-24 ">
      <img src={SignImg} alt="Sign Image" />
      <div className="flex flex-col gap-6 md:gap-8 md:mx-10 items-center sm:items-start max-lg:mt-40 justify-center">
        <h1 className="text-xl md:text-4xl font-medium font-inter ">
          {i18n.t('loginPage.title')}
        </h1>
        <p>{i18n.t('loginPage.enter')}</p>
        <form className="flex flex-col gap-6 md:gap-8 w-72 md:w-96">
          <TextField
            label={i18n.t('loginPage.emailOrPhone')}
            variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            type="password"
            label={i18n.t('loginPage.password')}
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex items-center gap-2 justify-between mt-4">
            <Button
              type="submit"
              sx={{
                color: 'white',
                fontSize: '16px',
                bgcolor: 'hsla(0, 68%, 56%, 1)',
                textTransform: 'none',
                padding: '16px 0',
                borderRadius: '4px',
                fontWeight: '500',
                width: '40%',
                ':hover': {
                  bgcolor: 'hsla(0, 68%, 56%, .9)',
                },
              }}
              variant="contained"
              color="primary"
              className="my-2"
            >
              {i18n.t('loginPage.login')}
            </Button>
            <button
              type="button"
              className="text-base text-red-500 hover:underline font-medium "
            >
              {i18n.t('loginPage.forgot')}
            </button>
          </div>
        </form>
        <p className="text-gray-600 mx-auto">
          <span>{i18n.t('loginPage.notHaveAccount')} </span>
          <Link
            to="/signUp"
            className="ml-2 text-gray-600 font-medium hover:underline"
          >
            {i18n.t('signUpPage.title')}
          </Link>
        </p>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
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

export default LogIn;

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import SignImg from './SignImg.png';
import instance from '@/config/axios';
import i18n from './components/common/components/LangConfig';
import useAuth from '@/hooks/useAuth';

const Login = () => {
  const { user } = useAuth();
  console.log(user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate(); // Thêm useNavigate ở đây

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post('/auth/signin', formData);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setFeedback({ message: 'Đăng nhập thành công', type: 'success' });

      setTimeout(() => {
        navigate('/account');
      }, 1000);
    } catch (error) {
      console.error(error);
      setFeedback({ message: 'Đăng nhập thất bại', type: 'error' });
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    user === null && navigate('/');
  }, []);

  return (
    <div className="relative flex max-lg:flex-col-reverse justify-center md:justify-start items-center mb-36 gap-12 lg:mt-28 xl:gap-24">
      <img src={SignImg} alt="Sign Image" />
      <div className="flex flex-col gap-6 md:gap-8 md:mx-10 items-center sm:items-start max-lg:mt-40 justify-center">
        <h1 className="text-4xl font-medium font-inter">
          {i18n.t('signUpPage.title')}
        </h1>
        <p>{i18n.t('signUpPage.enter')}</p>
        <form
          className="flex flex-col gap-6 w-72 md:w-96"
          onSubmit={handleSubmit}
        >
          <TextField
            name="email"
            label={i18n.t('signUpPage.email')}
            variant="standard"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            type="password"
            label={i18n.t('signUpPage.password')}
            variant="standard"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            sx={{
              color: 'white',
              fontSize: '16px',
              bgcolor: 'hsla(0, 68%, 56%, .9)',
              textTransform: 'none',
              padding: '16px 0',
              borderRadius: '4px',
              fontWeight: '500',
              width: '100%',
              marginTop: '1rem',
              ':hover': {
                bgcolor: 'hsla(0, 68%, 56%, 1)',
              },
            }}
            variant="contained"
            className="my-2"
          >
            {i18n.t('Login')}
          </Button>
        </form>

        <div className="w-72 md:w-96">
          <Button
            className="flex items-center justify-center gap-4"
            sx={{
              color: 'black',
              fontSize: '16px',
              bgcolor: 'white',
              textTransform: 'none',
              padding: '16px 0',
              borderRadius: '4px',
              fontWeight: '500',
              width: '100%',
              border: '1px solid hsla(0, 0%, 0%, 0.4)',
              ':hover': {
                bgcolor: 'hsla(0, 0%, 0%, 1)',
                color: 'white',
              },
            }}
          >
            {/* Google Icon SVG */}
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1920_3336)">
                <path
                  d="M23.766 12.7764C23.766 11.9607 23.6999 11.1406 23.5588 10.3381H12.24V14.9591H18.7217C18.4528 16.4494 17.5885 17.7678 16.323 18.6056V21.6039H20.19C22.4608 19.5139 23.766 16.4274 23.766 12.7764Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.2401 24.5008C15.4766 24.5008 18.2059 23.4382 20.1945 21.6039L16.3276 18.6055C15.2517 19.3375 13.8627 19.752 12.2445 19.752C9.11388 19.752 6.45946 17.6399 5.50705 14.8003H1.5166V17.8912C3.55371 21.9434 7.7029 24.5008 12.2401 24.5008Z"
                  fill="#34A853"
                />
                <path
                  d="M5.50253 14.8003C4.99987 13.3099 4.99987 11.6961 5.50253 10.2057V7.11481H1.51649C-0.18551 10.5056 -0.18551 14.5004 1.51649 17.8912L5.50253 14.8003Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.2401 5.24966C13.9509 5.2232 15.6044 5.86697 16.8434 7.04867L20.2695 3.62262C18.1001 1.5855 15.2208 0.465534 12.2401 0.500809C7.7029 0.500809 3.55371 3.05822 1.5166 7.11481L5.50264 10.2058C6.45064 7.36173 9.10947 5.24966 12.2401 5.24966Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_1920_3336">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 0.5)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>{i18n.t('signUpPage.withGoogle')}</span>
          </Button>
        </div>

        <p className="text-gray-600 mx-auto">
          {i18n.t('signUpPage.haveAccount')}
          <Link to="/signup" className="ml-2 font-medium hover:underline">
            {i18n.t('Sign Up')}
          </Link>
        </p>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={feedback.type}
          sx={{ width: '100%' }}
        >
          {feedback.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

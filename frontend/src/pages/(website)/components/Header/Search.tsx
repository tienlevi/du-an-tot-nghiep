import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { CiSearch } from 'react-icons/ci';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: alpha(theme.palette.grey[300], 0.3),
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[300], 0.6),
  },
  flex: 1,
  maxWidth: '400px',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  '& .MuiAutocomplete-root': {
    flex: 1,
    '& .MuiInputBase-root': {
      borderRadius: '10',
      backgroundColor: 'transparent',
      '& .MuiInputBase-input': {
        borderRadius: '10',
        fontSize: '0.9rem', // Default font size for input
        [theme.breakpoints.down('sm')]: {
          fontSize: '0.8rem', // Smaller font size for mobile
        },
      },
    },
  },
  '& .MuiIconButton-root': {
    '&:hover': {
      backgroundColor: 'rgba(219, 68, 68, .9)',
      color: 'white',
    },
  },
}));

const SearchAppBar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const onSubmit = useCallback(
    (e?: any) => {
      e.preventDefault();
      navigate(`/search?keyword=${searchText}`);
      window.location.reload();
    },
    [searchText],
  );

  return (
    <Search className="flex items-center justify-center w-48 min-[425px]:w-64 sm:max-[1200px]:w-96 min-[1200px]:w-60 min-[1450px]:w-96 ">
      <form onSubmit={onSubmit} className="flex w-full">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="outline-none placeholder-gray-400 flex-1"
          placeholder="Tìm kiếm"
        />
        <IconButton type="submit" aria-label="search" color="inherit">
          <CiSearch className="w-5 h-auto md:w-8 md:h-8" />
        </IconButton>
      </form>
    </Search>
  );
};

export default SearchAppBar;

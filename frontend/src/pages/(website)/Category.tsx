// Import statements remain the same
import { getProductsByCategory } from '@/services/category';
import { Product } from '@/types/product';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Menu, MenuItem, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GetProductsByCategory from './components/GetProductsByCategory/getProductsByCategory';
import i18n from './components/common/components/LangConfig';
import ViewAll from './components/common/components/ViewAll';
import WhiteButton from './components/common/components/WhiteButton';

const Category = () => {
  const { id } = useParams<{ id: string }>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    i18n.t('categories.technology'),
  );

 
  const { data: products } = useQuery({
    queryKey: ['categoryProducts', id],
    queryFn: () => getProductsByCategory(id),
  });

  console.log(products,'xxxx');
  

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setAnchorEl(null);
  };

  return (
    <div className="container mx-auto mt-40 flex flex-col gap-5">
      <Typography variant="h3" align="center" gutterBottom>
        {i18n.t('allProducts.byCategory')}
      </Typography>
      <div className="flex justify-center mb-4">
        <Button
          style={{
            backgroundColor: 'rgba(219, 68, 68, 1)',
            color: 'white',
            fontWeight: 'bold',
            padding: '10px 20px',
            borderRadius: '5px',
            textTransform: 'capitalize',
            boxShadow: '0 2px 4px rgba(0, 0, 0, .2)',
          }}
          variant="contained"
          startIcon={<ArrowDropDownIcon />}
          onClick={handleMenuOpen}
        >
          {i18n.t('redButtons.chooseByCategory')}
        </Button>
      </div>

      <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-semibold mb-8">
        GetProductsByCategory
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {products?.map((product:Product) => (
         
            <GetProductsByCategory key={product._id} product={product} />
          ))}
        </div>
      </div>

      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        className="mt-1 flex items-center justify-center mx-1"
      >
        {[
          i18n.t('categories.general'),
          i18n.t('categories.technology'),
          i18n.t('categories.gaming'),
          i18n.t('categories.clothes'),
          i18n.t('categories.newArrival'),
        ].map((category) => (
          <MenuItem
            className="w-36"
            key={category}
            onClick={() => handleCategorySelect(category)}
          >
            <span className="text-xl mx-auto">{category}</span>
          </MenuItem>
        ))}
      </Menu>
      
  
      <div className="mt-6 flex justify-center gap-5 md:gap-20 items-center md:mx-12">
        <Link to="..">
          <WhiteButton
            name={i18n.t('whiteButtons.backToHomePage')}
            onClick={() => {
           
            }}
          />
        </Link>
        <ViewAll name={i18n.t('redButtons.viewAllProducts')} />
      </div>
    </div>
  );
};

export default Category;

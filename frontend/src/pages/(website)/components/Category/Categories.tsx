import Arrows from '../common/components/Arrows';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/category';
import { Category } from '@/common/types/category';
import RedTitle from '../common/components/RedTitle';
import i18n from '../common/components/LangConfig';

const CategoryList = () => {
  const { data: categories } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await getCategories();
      return response.data;
    },
  });

  return (
    <div className={`grid grid-cols-${categories?.length} gap-4`}>
      {categories?.map((category, index) => (
        <Link to="category">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className=" w-full hover:animate-pulse flex gap-4 items-center justify-center flex-col bg-white  py-8 rounded-lg border border-gray-300 transition duration-300 hover:bg-cyan-400 hover:invert  hover:shadow-xl hover:-translate-y-2 "
          >
            <div>{category.name}</div>
          </button>
        </Link>
      ))}
    </div>
  );
};

const Categories = () => {
  return (
    <div className="px-4 py-12 ">
      <RedTitle title={i18n.t('category.redTitle')} />
      <div className="flex gap-20 flex-col md:flex-row  mb-8">
        <h2 className="text-xl md:text-3xl font-semibold ">
          {i18n.t('category.title')}
        </h2>
        <Arrows />
      </div>
      <CategoryList />
    </div>
  );
};

export default Categories;

/* eslint-disable @typescript-eslint/no-shadow */
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import useGetProducts from '~/hooks/products/Queries/useGetProductsForAdmin';
import { IProductItem } from '~/types/Product';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import _ from 'lodash';
import { ProductsListColumns } from './Helper/tableList';
import { ColumnsType } from 'antd/es/table';
import { ADMIN_ROUTES } from '~/constants/router';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';
import TableDisplay from '../../../components/_common/TableDisplay';
import useHideProduct from '~/hooks/products/Mutations/useHideProduct';
import useShowProduct from '~/hooks/products/Mutations/useShowProduct';

const ListAll = () => {
    const { onSelectPaginateChange, query, onFilter, getColumnSearchProps, getFilteredValue } =
        useTable<IProductItem>();
    const [brands, categories] = useGetCategoriesAndBrands();
    const { mutate: mutateHideProduct } = useHideProduct();
    const { mutate: mutateShowProduct } = useShowProduct();
    const { data } = useGetProducts(query);
    const currentPage = Number(query.page || 1);

    const brandFilter = brands?.data?.data?.map((brand) => ({
        text: brand.name,
        value: brand._id,
    }));
    const categoryFilter = categories?.data?.data?.map((category) => ({
        text: category.name,
        value: category._id,
    }));

    const productData = data?.data.products;
    const totalDocs = data?.data.totalDocs;

    const columns = ProductsListColumns({
        brandFilter,
        categoryFilter,
        query,
        getColumnSearchProps,
        mutateShowProduct,
        mutateHideProduct,
        getFilteredValue,
    }) as ColumnsType<IProductItem>;

    return (
        <WrapperPageAdmin
            title='Quản lý sản phẩm'
            option={
                <Link to={ADMIN_ROUTES.PRODUCTS_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới sản phẩm
                    </Button>
                </Link>
            }
        >
            <TableDisplay<IProductItem>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={productData}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ListAll;

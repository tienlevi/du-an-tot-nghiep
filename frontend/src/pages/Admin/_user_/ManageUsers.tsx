/* eslint-disable @typescript-eslint/no-shadow */
import { EditOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Image, Space, Tooltip } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import StaticImages from '~/assets';
import WrapperPageAdmin from '~/pages/Admins/_common/WrapperPageAdmin';
import { ROLE } from '~/constants/enum';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllUsers from '~/hooks/users/Queries/useGetAllUsers';
import { IUser } from '~/utils/api/apiHelper';
import { cn } from '~/utils';
import useTable from '~/hooks/_common/useTable';
import TableDisplay from '../../../components/_common/TableDisplay';

const ManageUsers = () => {
    const { query, onSelectPaginateChange, onFilter, getColumnSearchProps, getFilteredValue } = useTable<IUser>();
    const { data } = useGetAllUsers(query);
    const users = data?.data?.users;
    const totalDocs = data?.data?.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<IUser>['columns'] = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar) => (
                <div>
                    <Image src={avatar || StaticImages.userImageDf} width={100} height={100} />
                </div>
            ),
            responsive: ['lg'],
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'search',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
            filteredValue: getFilteredValue('role'),
            filters: [
                { text: 'Quản trị viên', value: ROLE.ADMIN },
                { text: 'Người dùng', value: ROLE.USER },
            ],
            render: (role) => (
                <span className={cn({ ['text-red']: role === ROLE.ADMIN, ['text-green-500']: role === ROLE.USER })}>
                    {role === ROLE.ADMIN && 'Quản trị viên'} {role === ROLE.USER && 'Người dùng'}
                </span>
            ),
        },

        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật'>
                        <Link to={`${ADMIN_ROUTES.USERS_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin title='Quản lý người dùng'>
            <TableDisplay<IUser>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={users}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default ManageUsers;

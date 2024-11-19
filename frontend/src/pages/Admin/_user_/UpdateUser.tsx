import { Button, Card, Form, FormProps, Image, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetDetail from '~/hooks/users/Queries/useGetailUser';
import { IProductFiles, IThumbnailAntd } from '~/types/Product';
import { errorMessage } from '~/validation/Products/Product';
import { ACCEPT_FILE_TYPE, FileType, getBase64, MAX_SIZE } from '../_product_/Helper/_helper_';
import convertApiResponseToFileList from '../_product_/Helper/convertImageUrlToFileList';
import { DeleteOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import useUpdateUser from '~/hooks/users/Mutations/useUpdateUser';
import { ADMIN_ROUTES } from '~/constants/router';
import { Role } from '~/constants/enum';

type FieldType = {
    name: string;
    email: string;
    phone: string;
    role: string;
    avatar: IProductFiles;
};

const UpdateUser = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetDetail(id as string);
    const userData = data?.data?.user;

    const [form] = Form.useForm<FieldType>();
    const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);
    const { mutate: updateUser, isPending } = useUpdateUser(id as string);
    const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
    const [previewThumbnail, setPreviewThumbnail] = useState<string>('');

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const formDataUpdateUser = new FormData();

        formDataUpdateUser.append('name', values.name);
        formDataUpdateUser.append('email', values.email);
        formDataUpdateUser.append('role', values.role || (userData?.role as string));
        formDataUpdateUser.append('phone', values.phone);
        formDataUpdateUser.append('avatar', (values.avatar?.fileList?.[0] as IThumbnailAntd)?.originFileObj);
        formDataUpdateUser.append('avatarRef', userData?.avatarRef as string);

        updateUser(formDataUpdateUser);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const thumbnailValidator = async (_: any, thumbnail: IProductFiles) => {
        if (
            thumbnail &&
            thumbnail.fileList &&
            thumbnail.fileList.length > 0 &&
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (thumbnail.fileList[0] as any).originFileObj
        ) {
            if (thumbnail?.fileList?.length < 1 || !thumbnail) {
                return errorMessage('Please input your thumbnail!');
            }
            if (thumbnail && thumbnail.file.size && thumbnail?.file.size >= MAX_SIZE) {
                return errorMessage('Image size must be smaller than 5MB!');
            }
            if (thumbnail?.file.type && !ACCEPT_FILE_TYPE.includes(thumbnail?.file.type)) {
                return errorMessage('Only accept png, jpg and jpeg type!');
            }
        }
        return Promise.resolve();
    };

    const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewThumbnail(file.url || (file.preview as string));
        setPreviewThumbnailOpen(true);
    };

    const customItemRender: UploadProps['itemRender'] = (originNode, file, fileList, actions) => {
        return (
            <div className='ant-upload-list-item ant-upload-list-item-undefined'>
                <img className='' src={file.thumbUrl || file.url} alt={file.name} />
                <span className='ant-upload-list-item-actions'>
                    <span
                        onClick={actions.preview}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <EyeOutlined />
                    </span>
                    <span
                        onClick={actions.remove}
                        className='ant-btn css-dev-only-do-not-override-mzwlov ant-btn-text ant-btn-sm ant-btn-icon-only ant-upload-list-item-action text-white'
                    >
                        <DeleteOutlined />
                    </span>
                </span>
            </div>
        );
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type='button'>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    useEffect(() => {
        if (userData) {
            const thumbnailConvert = convertApiResponseToFileList({
                url: userData?.avatar,
                urlRef: userData?.avatarRef,
                isArr: true,
            }) as UploadFile<any>[];

            setThumbnailFile(thumbnailConvert);
        }
    }, [userData]);

    return (
        <div className='mx-6 rounded-lg bg-white px-4 py-6'>
            <Card
                loading={isLoading}
                title='Thông tin chung'
                extra={<Link to={ADMIN_ROUTES.USERS}>Quay lại danh sách</Link>}
            >
                <div className='m-auto'>
                    <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off'>
                        <div className='my-3 flex items-center justify-center'>
                            <Form.Item<FieldType>
                                label='Avatar'
                                name='avatar'
                                className='font-medium text-[#08090F]'
                                dependencies={['thumbnail']}
                                rules={[
                                    {
                                        validator: thumbnailValidator,
                                    },
                                ]}
                            >
                                <Upload
                                    beforeUpload={() => false}
                                    listType='picture-card'
                                    itemRender={customItemRender}
                                    fileList={thumbnailFile}
                                    onPreview={(file) => handlePreview(file)}
                                    onChange={handleChangeThumbnail}
                                    maxCount={1}
                                >
                                    {thumbnailFile.length >= 1 ? null : uploadButton}
                                </Upload>
                            </Form.Item>
                            {previewThumbnail && (
                                <Image
                                    wrapperStyle={{ display: 'none' }}
                                    width={30}
                                    height={30}
                                    preview={{
                                        visible: previewThumbnailOpen,
                                        onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
                                        afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
                                    }}
                                    src={previewThumbnail}
                                />
                            )}
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <Form.Item<FieldType>
                                label='Username'
                                name='name'
                                className='font-medium text-[#08090F]'
                                initialValue={userData?.name}
                                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
                            >
                                <Input size='large' />
                            </Form.Item>
                            <Form.Item<FieldType>
                                label='Email'
                                name='email'
                                initialValue={userData?.email}
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
                            >
                                <Input type='email' size='large'></Input>
                            </Form.Item>
                        </div>
                        <div className='grid grid-cols-2 gap-2'>
                            <Form.Item<FieldType>
                                className='font-medium text-[#08090F]'
                                label='Phone Number'
                                initialValue={userData?.phone}
                                name='phone'
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input type='text' size='large' className='w-full' />
                            </Form.Item>
                            {userData?.role !== Role.ADMIN && (
                                <Form.Item<FieldType>
                                    className='font-medium text-[#08090F]'
                                    label='Role'
                                    name='role'
                                    initialValue={userData?.role}
                                >
                                    <Select
                                        size='large'
                                        className='w-full'
                                        options={[
                                            { value: 'user', label: 'Người dùng' },
                                            { value: 'admin', label: 'Quản trị viên' },
                                        ]}
                                    ></Select>
                                </Form.Item>
                            )}
                        </div>
                        <div className='flex gap-2'>
                            <Button
                                type='primary'
                                disabled={isPending}
                                loading={isPending}
                                htmlType='submit'
                                className='mb-4'
                            >
                                Update User
                            </Button>
                            <Button type='dashed' htmlType='reset' className='mb-4'>
                                Reset
                            </Button>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
    );
};

export default UpdateUser;

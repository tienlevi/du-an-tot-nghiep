// import { EditOutlined, PlusOutlined } from '@ant-design/icons';
// import { Button, Form, FormProps, Image, Input, Select, Upload, UploadFile, UploadProps } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
// import { useEffect, useState } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { useGetAllAtributes } from '@/hooks/attributes/Queries/useGetAttributesByCate';
// import useGetCategoriesAndBrands from '@/hooks/useGetCategoriesAndBrands';
// import { IAttributesValue } from '@/types/Attributes';
// import { IProductForm } from '@/types/Product';
// import {
//     brandValidator,
//     categoryValidator,
//     imagesValidator,
//     nameValidator,
//     thumbnailValidator,
//     variationsValidator,
// } from '@/validation/Products/validators';
// import AttributesItem from './_component/AttributesItem';
// import VariationItem from './_component/VariationItem';
// import { FileType, getBase64 } from './Helper/_helper_';
// import { UploadButton } from './_component/UploadButton';
// import useGetDetailProductAdmin from '@/hooks/products/Queries/useGetDetailProductAdmin';
// import { handleEditProduct } from './Helper/handleEditProduct';
// import useUpdateProduct from '@/hooks/products/Mutations/useUpdateProduct';
// import useUpdateProductVariant from '@/hooks/products/Mutations/useUpdateProductVariant';
// import useCreateProductVariant from '@/hooks/products/Mutations/useCreateProductVariant';
// import CustomItemRender from './_component/CustomItemRender';
// import convertApiResponseToFileList from './Helper/convertImageUrlToFileList';
// import convertData from './Helper/convertData';
// import { DataTypeConvert } from '@/constants/enum';
// import WrapperCard from './_component/WrapperCard';
// import { ADMIN_ROUTES } from '@/constants/router';
// import WrapperPageAdmin from '../_common/WrapperPageAdmin';

// const UpdateProduct = () => {
//     const { id } = useParams();
//     // @Form
//     const [form] = Form.useForm<IProductForm>();
//     // @initial form values
//     const [initialValues, setInitialValues] = useState<any>();
//     const [isHide, setIsHide] = useState<boolean>(false);

//     // @preview images
//     const [previewImagesOpen, setPreviewImagesOpen] = useState<boolean>(false);
//     const [previewImages, setPreviewImages] = useState<string>('');
//     const [previewThumbnailOpen, setPreviewThumbnailOpen] = useState<boolean>(false);
//     const [previewThumbnail, setPreviewThumbnail] = useState<string>('');

//     // @images
//     const [imagesfileList, setImagesFileList] = useState<UploadFile[]>([]);

//     // @thumbnail
//     const [thumbnailFile, setThumbnailFile] = useState<UploadFile[]>([]);

//     // @variany images
//     const [variantFile, setVariantFile] = useState<UploadFile[][]>([]);

//     // @choose category
//     const [categoryIdNew, setCategoryIdNew] = useState<string>('');

//     // Query
//     const { data } = useGetDetailProductAdmin(id as string);
//     const productDetails = data?.data;
//     const { data: attributesRes } = useGetAllAtributes(categoryIdNew || productDetails?.categoryId._id || '');
//     const attributesForProduct = attributesRes?.data.productAttributes.attributeIds;
//     const attributesForVariant = attributesRes?.data.variantAttribute.attributeIds;
//     const [brandsRes, categoriesRes] = useGetCategoriesAndBrands();
//     const categories = categoriesRes.data?.data;
//     const brands = brandsRes.data?.data;

//     // Mutation
//     const { mutate: updateProduct, isPending } = useUpdateProduct();
//     const { mutate: updateProductVariant } = useUpdateProductVariant();
//     const { mutate: createProductVariant } = useCreateProductVariant();

//     // @Handle
//     const handlePreview = async (file: UploadFile, multiple: boolean) => {
//         if (!file.url && !file.preview) {
//             file.preview = await getBase64(file.originFileObj as FileType);
//         }
//         if (multiple) {
//             setPreviewImages(file.url || (file.preview as string));
//             setPreviewImagesOpen(true);
//         } else {
//             setPreviewThumbnail(file.url || (file.preview as string));
//             setPreviewThumbnailOpen(true);
//         }
//     };

//     const handleChangeCat = (value: string) => {
//         const dataSource = JSON.parse(JSON.stringify(initialValues));
//         if (productDetails && value !== productDetails.categoryId._id) {
//             dataSource.initialValue.variations = '';
//             dataSource.initialValue.attributes = '';
//             dataSource.initialValue.categoryId = value;
//             setVariantFile([]);
//         } else {
//             setVariantFile(initialValues.initialVariantFile);
//             dataSource.initialValue.categoryId = productDetails?.categoryId._id;
//         }
//         form.setFieldsValue(dataSource.initialValue);
//         setImagesFileList(initialValues.initialImages);
//         setThumbnailFile(initialValues.initialThumbnail);
//         setCategoryIdNew(value);
//     };

//     const handleChangeImages: UploadProps['onChange'] = ({ fileList: newFileList }) => {
//         setImagesFileList(newFileList);
//     };
//     const handleChangeThumbnail: UploadProps['onChange'] = ({ fileList: newFileList }) => setThumbnailFile(newFileList);

//     const handleChangeAttributeThumbnail = (index: number): UploadProps['onChange'] => {
//         return ({ fileList: newFileList }) => {
//             const newVariantFile = [...variantFile];
//             newVariantFile[index] = newFileList;
//             setVariantFile(newVariantFile);
//         };
//     };
//     const handleRemoveAttributeThumbnail = (index: number) => {
//         const newVariantFile = [...variantFile];
//         newVariantFile[index] = [];
//         setVariantFile(newVariantFile);
//     };

//     const onFinish: FormProps<IProductForm>['onFinish'] = (values) => {
//         if (productDetails) {
//             handleEditProduct({
//                 productId: id as string,
//                 data: values,
//                 imagesInit: imagesfileList,
//                 updateProduct,
//                 updateProductVariant,
//                 createProductVariant,
//             });
//         }
//     };

//     const handleSaveAndHide = () => {
//         setIsHide(true);
//         form.setFieldsValue({ isHide: true });
//     };
//     const onReset = () => {
//         form.setFieldsValue(initialValues.initialValue);
//         setImagesFileList(initialValues.initialImages);
//         setThumbnailFile(initialValues.initialThumbnail);
//         setVariantFile(initialValues.initialVariantFile);
//     };

//     useEffect(() => {
//         if (productDetails) {
//             const {
//                 attributes,
//                 variationIds,
//                 thumbnail,
//                 thumbnailUrlRef,
//                 images,
//                 imageUrlRefs,
//                 categoryId,
//                 brandId,
//                 ...rest
//             } = productDetails;

//             const imagesConvert = images.map((url, i) =>
//                 convertApiResponseToFileList({ url, urlRef: imageUrlRefs[i] })
//             ) as UploadFile<any>[];
//             const thumbnailConvert = convertApiResponseToFileList({
//                 url: thumbnail,
//                 urlRef: thumbnailUrlRef,
//                 isArr: true,
//             }) as UploadFile<any>[];

//             const attConvert = convertData({ data: attributes, to: DataTypeConvert.obj });
//             let newVariantFile: UploadFile<any>[][] = [];
//             const variaConverts = variationIds.map((varia, i) => {
//                 let variantAttributes;
//                 if (varia.variantAttributes) {
//                     variantAttributes = convertData({ data: varia.variantAttributes, to: DataTypeConvert.obj });
//                 }
//                 const image = convertApiResponseToFileList({
//                     url: varia.image!,
//                     urlRef: varia.imageUrlRef,
//                     isArr: true,
//                 }) as UploadFile<any>[];
//                 newVariantFile = [...newVariantFile];
//                 newVariantFile[i] = image;
//                 setVariantFile((prev) => [...prev, image]);
//                 const newVaria = { ...varia, variantAttributes, thumbnail: image };
//                 delete newVaria.image;
//                 return newVaria;
//             });

//             const initial: any = {
//                 images: imagesConvert,
//                 thumbnail: thumbnailConvert,
//                 attributes: attConvert,
//                 categoryId: categoryId._id,
//                 variations: variaConverts,
//                 brandId: brandId._id,
//                 ...rest,
//             };
//             setImagesFileList(imagesConvert);
//             setThumbnailFile(thumbnailConvert);
//             setInitialValues({
//                 initialValue: initial,
//                 initialImages: imagesConvert,
//                 initialThumbnail: thumbnailConvert,
//                 initialVariantFile: newVariantFile,
//             });

//             form.setFieldsValue(initial as any);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [productDetails, id]);
//     return (
//         <WrapperPageAdmin
//             title='Cập nhật sản phẩm'
//             option={
//                 <Link to={ADMIN_ROUTES.PRODUCTS} className='underline'>
//                     Quay lại
//                 </Link>
//             }
//         >
//             {productDetails && (
//                 <Form layout='vertical' form={form} onFinish={onFinish} autoComplete='off' className='capitalize'>
//                     <div className='grid grid-cols-1 gap-4'>
//                         <WrapperCard title='Thông tin cơ bản'>
//                             <Form.Item name='isHide' className='hidden' hidden>
//                                 <Input type='hidden' />
//                             </Form.Item>
//                             <Form.Item<IProductForm>
//                                 label='Danh mục'
//                                 name='categoryId'
//                                 required
//                                 className='font-medium text-[#08090F]'
//                                 rules={[categoryValidator()]}
//                                 validateTrigger={['onChange', 'onBlur']}
//                             >
//                                 <Select
//                                     size='large'
//                                     onChange={handleChangeCat}
//                                     placeholder='Chọn danh mục cho sản phẩm...'
//                                     className='w-full'
//                                     options={categories?.map((category) => ({
//                                         label: category.name,
//                                         value: category._id,
//                                     }))}
//                                 />
//                             </Form.Item>
//                             <Form.Item<IProductForm>
//                                 label='Thương hiệu'
//                                 name='brandId'
//                                 required
//                                 className='font-medium text-[#08090F]'
//                                 rules={[brandValidator()]}
//                             >
//                                 <Select
//                                     size='large'
//                                     className='w-full normal-case'
//                                     placeholder='Chọn thương hiệu cho sản phẩm...'
//                                     options={brands?.map((brand) => ({
//                                         label: brand.name,
//                                         value: brand._id,
//                                     }))}
//                                 />
//                             </Form.Item>
//                             <Form.Item<IProductForm>
//                                 label='Hình ảnh sản phẩm'
//                                 name='images'
//                                 required
//                                 className='font-medium text-[#08090F]'
//                                 dependencies={['images']}
//                                 rules={[
//                                     {
//                                         validator: imagesValidator,
//                                     },
//                                 ]}
//                             >
//                                 <Upload
//                                     beforeUpload={() => false}
//                                     listType='picture-card'
//                                     onRemove={() => setImagesFileList([])}
//                                     fileList={imagesfileList}
//                                     itemRender={CustomItemRender}
//                                     onPreview={(files) => handlePreview(files, true)}
//                                     onChange={handleChangeImages}
//                                     maxCount={5}
//                                     multiple
//                                 >
//                                     {imagesfileList.length >= 5 ? null : UploadButton}
//                                 </Upload>
//                             </Form.Item>
//                             {previewImages && (
//                                 <Image
//                                     wrapperStyle={{ display: 'none' }}
//                                     preview={{
//                                         visible: previewImagesOpen,
//                                         onVisibleChange: (visible) => setPreviewImagesOpen(visible),
//                                         afterOpenChange: (visible) => !visible && setPreviewImages(''),
//                                     }}
//                                     src={previewImages}
//                                 />
//                             )}
//                             <Form.Item<IProductForm>
//                                 label='Ảnh bìa'
//                                 required
//                                 name='thumbnail'
//                                 className='font-medium text-[#08090F]'
//                                 dependencies={['thumbnail']}
//                                 rules={[
//                                     {
//                                         validator: thumbnailValidator,
//                                     },
//                                 ]}
//                             >
//                                 <Upload
//                                     beforeUpload={() => false}
//                                     listType='picture-card'
//                                     itemRender={CustomItemRender}
//                                     fileList={thumbnailFile}
//                                     onPreview={(file) => handlePreview(file, false)}
//                                     onChange={handleChangeThumbnail}
//                                     maxCount={1}
//                                 >
//                                     {thumbnailFile.length >= 1 ? null : UploadButton}
//                                 </Upload>
//                             </Form.Item>
//                             {previewThumbnail && (
//                                 <Image
//                                     wrapperStyle={{ display: 'none' }}
//                                     preview={{
//                                         visible: previewThumbnailOpen,
//                                         onVisibleChange: (visible) => setPreviewThumbnailOpen(visible),
//                                         afterOpenChange: (visible) => !visible && setPreviewThumbnail(''),
//                                     }}
//                                     src={previewThumbnail}
//                                 />
//                             )}
//                             <Form.Item<IProductForm>
//                                 label='Tên sản phẩm'
//                                 name='name'
//                                 required
//                                 className='font-medium text-[#08090F]'
//                                 rules={[
//                                     {
//                                         validator: nameValidator,
//                                     },
//                                 ]}
//                             >
//                                 <Input size='large' />
//                             </Form.Item>
//                             <Form.Item<IProductForm>
//                                 label='Mô tả'
//                                 name='description'
//                                 className='font-medium text-[#08090F]'
//                             >
//                                 <TextArea placeholder='Nhập mô tả sản phẩm...' rows={4} className='w-full' />
//                             </Form.Item>
//                         </WrapperCard>

//                         {attributesForProduct && (
//                             <>
//                                 <WrapperCard title='Thông tin chi tiết'>
//                                     <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
//                                         {attributesForProduct?.map((attribute: IAttributesValue, index: number) => (
//                                             <AttributesItem attribute={attribute} key={index} />
//                                         ))}
//                                     </div>
//                                 </WrapperCard>
//                                 <WrapperCard title='Thông tin bán hàng'>
//                                     <Form.List
//                                         name='variations'
//                                         rules={[
//                                             {
//                                                 validator: variationsValidator,
//                                             },
//                                         ]}
//                                     >
//                                         {(fields, { add, remove }, { errors }) => (
//                                             <>
//                                                 {fields.map(({ key, name, ...restField }, index) => {
//                                                     const idProductVariant = form.getFieldValue([
//                                                         'variations',
//                                                         name,
//                                                         '_id',
//                                                     ]);
//                                                     return (
//                                                         <VariationItem
//                                                             key={key}
//                                                             index={index}
//                                                             attributesForVariant={attributesForVariant}
//                                                             fieldName={name}
//                                                             restField={restField}
//                                                             variantFile={variantFile}
//                                                             handleChangeThumbnail={handleChangeAttributeThumbnail}
//                                                             handleRemoveThumbnail={handleRemoveAttributeThumbnail}
//                                                             removeVariation={remove}
//                                                             id={idProductVariant}
//                                                         />
//                                                     );
//                                                 })}
//                                                 <Form.Item>
//                                                     <Button
//                                                         htmlType='button'
//                                                         type='dashed'
//                                                         onClick={() => add()}
//                                                         block
//                                                         icon={<PlusOutlined />}
//                                                     >
//                                                         Thêm biến thể
//                                                     </Button>
//                                                 </Form.Item>
//                                             </>
//                                         )}
//                                     </Form.List>
//                                 </WrapperCard>
//                             </>
//                         )}
//                     </div>
//                     <div className='sticky bottom-0 right-0 my-2 flex justify-end rounded-md border-t-2 border-black border-opacity-5 bg-white p-4'>
//                         <Button type='dashed' htmlType='button' onClick={onReset} className='mr-3 px-5' size='large'>
//                             Đặt lại
//                         </Button>
//                         <Button
//                             type='default'
//                             htmlType='submit'
//                             className='mr-3 px-5'
//                             loading={isPending && isHide}
//                             disabled={isPending}
//                             onClick={handleSaveAndHide}
//                             size='large'
//                         >
//                             Lưu và ẩn
//                         </Button>
//                         <Button
//                             type='primary'
//                             htmlType='submit'
//                             icon={<EditOutlined />}
//                             className='px-5'
//                             loading={isPending && !isHide}
//                             disabled={isPending}
//                             size='large'
//                         >
//                             Cập nhật
//                         </Button>
//                     </div>
//                 </Form>
//             )}
//         </WrapperPageAdmin>
//     );
// };
// export default UpdateProduct;

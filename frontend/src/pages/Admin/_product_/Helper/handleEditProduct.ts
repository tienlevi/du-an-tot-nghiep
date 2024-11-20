import { IProductForm } from '@/types/Product';

export const handleEditProduct = (
    data: IProductForm,
    id: string,
    updateProduct: ({ data, id }: { data: FormData; id: string }) => void,
) => {
    const formData = new FormData();
    const { name, description, variants, price, discount, tags, category } =
        data;
    const firstElement = 0;
    const newVariants = [];

    if (variants) {
        for (const [, value] of Object.entries(variants)) {
            if (value?.thumbnail?.fileList?.[firstElement]?.originFileObj) {
                formData.append(
                    'variantImages',
                    value.thumbnail?.fileList?.[firstElement]
                        .originFileObj as File,
                );
                Object.assign(value, {
                    imageUrlRef: value.thumbnail?.fileList[firstElement].name,
                });
                // Delete thumbnail
                const { thumbnail, ...rest } = value;
                const { imageUrlRef, size, color, stock } = rest;
                const variantFinal = {
                    imageUrlRef,
                    size,
                    color,
                    stock,
                };
                newVariants.push(variantFinal);
            }
        }
    }
    /* eslint-enable */
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', `${price}`);
    formData.append('discount', discount ? `${discount}` : '0');
    formData.append('tags', tags?.join(',') || '');
    formData.append('variantString', JSON.stringify(newVariants));
    formData.append('description', description || '');
    console.log(formData);
    // Mutation to create product
    updateProduct({ data: formData, id });
};

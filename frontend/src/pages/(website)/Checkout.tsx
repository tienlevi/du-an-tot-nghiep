import { FormProvider, useForm } from 'react-hook-form';
import FormCheckOut from './components/Checkout/FormCheckOut';
import ProductCheckOut from './components/Checkout/ProductCheckOut';

const Checkout = () => {
  const methods = useForm();

  return (
    <div className="max-w-screen-lg mx-auto mt-36">
      <div className="flex items-start mt-4 md:flex-row flex-col gap-10 md:gap-40">
        <FormProvider {...methods}>
          <FormCheckOut />
          <ProductCheckOut />
        </FormProvider>
      </div>
    </div>
  );
};

export default Checkout;

import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

interface Inputs {
  userId: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

function FormCheckOut() {
  const { user } = useAuth();
  const { register, reset } = useFormContext<Inputs>();

  useEffect(() => {
    reset({ userId: user?._id, name: user?.name, email: user?.email });
  }, [user]);

  return (
    <div className="flex items-center justify-between  mt-4">
      <div className="flex flex-col gap-4 md:gap-12">
        <span className="text-2xl md:text-4xl font-medium">Check Out</span>

        <div className="flex flex-col gap-4 md:gap-8 w-[300px] md:w-[470px]">
          <div className="flex flex-col gap-1">
            <span className="text-sm md:text-base text-gray-400">Name *</span>
            <input
              type="text"
              required
              {...register('name')}
              className="border border-black rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm md:text-base text-gray-400">Phone *</span>
            <input
              type="text"
              {...register('phone')}
              className="border border-black rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm md:text-base text-gray-400">Email *</span>
            <input
              type="text"
              {...register('email')}
              required
              className="border border-black rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm md:text-base text-gray-400">
              Address *
            </span>
            <input
              type="text"
              placeholder=""
              {...register('address')}
              className="border border-black rounded bg-gray-100 bg-opacity-100 px-4 py-3 text-gray-400 text-sm md:text-base focus:border outline-none focus:border-gray-300  "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormCheckOut;

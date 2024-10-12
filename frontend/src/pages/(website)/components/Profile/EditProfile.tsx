import useAuth from '@/hooks/useAuth';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface Inputs {
  name: string;
  email: string;
  password: string;
  tel: string;
}

function EditProfile() {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { user } = useAuth();

  useEffect(() => {
    reset(user);
  }, [user]);

  return (
    <div className="shadow  w-[full] flex flex-col py-10 md:px-20 px-5 rounded">
      <div className="flex flex-col gap-6 md:w-[710px]">
        <span className="text-xl font-medium text-red-600">Edit Profile</span>
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px] justify-between">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm md:text-base ">Name</span>
            <input
              type="text"
              required
              {...register('name')}
              className=" rounded bg-gray-100 border border-black px-4 py-3 text-gray-400 text-sm md:text-base"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px] justify-between">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm md:text-base ">Email</span>
            <input
              type="email"
              required
              {...register('email')}
              className=" rounded bg-gray-100 border border-black px-4 py-3 text-gray-400 text-sm md:text-base"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-full">
          <span className="text-sm md:text-base ">Current Password</span>
          <input
            type="password"
            {...register('password')}
            required
            className=" rounded bg-gray-100 border border-black px-4 py-3 text-gray-400 text-sm md:text-base"
          />
          <input
            type="password"
            {...register('password')}
            required
            className=" rounded bg-gray-100 border border-black px-4 py-3 text-gray-400 text-sm md:text-base"
          />
          <input
            type="password"
            {...register('password')}
            required
            className=" rounded bg-gray-100 border border-black px-4 py-3 text-gray-400 text-sm md:text-base"
          />
        </div>
        <div className="ml-auto flex items-center gap-8 text-sm md:text-base ">
          {/* Cancel and save changes buttons */}
          <button className="hover:underline underline-offset-4  ease-in-out  duration-300 transform hover:-translate-y-1">
            Cancel
          </button>
          <button className="text-sm md:text-lg bg-red-600 text-white px-6 md:px-12 py-3 rounded hover:bg-red-500 transition-transform duration-100 transform hover:translate-y-[-4px] focus:translate-y-0">
            Change
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;

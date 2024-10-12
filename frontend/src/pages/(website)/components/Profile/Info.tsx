import useAuth from '@/hooks/useAuth';

function Info() {
  const { user } = useAuth();

  return (
    <div className="shadow  w-[full] flex flex-col py-10 md:px-20 px-5 rounded">
      <div className="flex flex-col gap-6 md:w-[710px]">
        <span className="text-xl font-medium text-red-600">My Profile</span>
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px] justify-between">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm md:text-base ">Name: {user?.name}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-[50px] justify-between">
          <div className="flex flex-col gap-2 w-full">
            <span className="text-sm md:text-base ">Email: {user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

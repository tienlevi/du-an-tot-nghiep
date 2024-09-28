import { useState, useEffect } from 'react';
import calculateTimeLeft from '../functions/calculateTimeLeft';
import i18n from './LangConfig';

const Deal = () => {
  // const dealEndTime = new Date('2024-12-31T23:59:59'); // Ví dụ thời gian trong tương lai
  // const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft(dealEndTime));

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     const updatedTimeLeft = calculateTimeLeft(dealEndTime);
  //     console.log(updatedTimeLeft);  // In ra timeLeft để kiểm tra
  //     setTimeLeft(updatedTimeLeft);
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [dealEndTime]);

  // Render fallback nếu `timeLeft` không tồn tại hoặc là null
  // if (!timeLeft || !timeLeft.days) return <div>Countdown finished</div>;

  return (
    <div className="flex gap-10 md:my-10 mt-10 items-center justify-center flex-col-reverse md:flex-row min-h-[500px] bg-black text-white">
      <div className="flex flex-col gap-5 items-center md:items-start md:mx-12">
        <h3 className="text-green text-sm">{i18n.t('deal.greenTitle')}</h3>
        <h2 className="xl:w-[500px] text-center md:text-start text-2xl sm:text-3xl lg:text-5xl font-semibold font-inter">
          {i18n.t('deal.title')}
        </h2>
        <div className="font-semibold text-base flex flex-row gap-6 text-black">
          {['days', 'hours', 'minutes', 'seconds'].map((unit, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center py-3 bg-white rounded-full"
            >
              {/* <span>{timeLeft[unit]}</span>  */}
              <span className="font-light text-xs w-[62px] text-center">
                {i18n.t(`deal.${unit}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Deal;

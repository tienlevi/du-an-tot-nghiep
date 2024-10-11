import { useState, useEffect } from 'react';
import calculateTimeLeft from '../functions/calculateTimeLeft';
import i18n from './LangConfig';

const Deal = () => {
  const [timeLeft, setTimeLeft] = useState<any>(
    calculateTimeLeft(new Date('2024-12-27T00:00:00')),
  );

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(new Date('2024-12-27T00:00:00')));
    }, 1000);


    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-10 md:my-10 mt-10 items-center justify-center flex-col-reverse md:flex-row min-h-[500px] bg-black text-white">
      <div className="flex flex-col gap-5 items-center md:items-start md:mx-12">
        <h3 className="text-green text-sm">{i18n.t('deal.greenTitle')}</h3>
        <h2 className="xl:w-[500px] text-center md:text-start text-2xl sm:text-3xl lg:text-5xl font-semibold font-inter">
          {i18n.t('deal.title')}
        </h2>
        <div className="font-semibold text-base flex flex-row gap-6 text-black">
          <div className="flex flex-col items-center justify-center py-3 bg-white rounded-full">
            <span>{timeLeft?.days || '00'}</span>
            <span className="font-light text-xs w-[62px] text-center">
              {i18n.t('deal.days')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-3 bg-white rounded-full">
            <span>{timeLeft?.hours || '00'}</span>
            <span className="font-light text-xs w-[62px] text-center">
              {i18n.t('deal.hours')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-3 bg-white rounded-full">
            <span>{timeLeft?.minutes || '00'}</span>
            <span className="font-light text-xs w-[62px] text-center">
              {i18n.t('deal.minutes')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-3 bg-white rounded-full">
            <span>{timeLeft?.seconds || '00'}</span>
            <span className="font-light text-xs w-[62px] text-center">
              {i18n.t('deal.seconds')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deal;

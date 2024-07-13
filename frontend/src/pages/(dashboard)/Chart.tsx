import React from 'react';
import Breadcrumb from './_components/Breadcrumbs/Breadcrumb';
import ChartOne from './_components/Charts/ChartOne';
import ChartThree from './_components/Charts/ChartThree';
import ChartTwo from './_components/Charts/ChartTwo';
import DefaultLayout from './Layout/DefaultLayout';

const Chart: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayout>
  );
};

export default Chart;

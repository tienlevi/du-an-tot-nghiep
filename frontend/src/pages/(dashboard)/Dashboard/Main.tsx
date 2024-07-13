import React from 'react';

import DefaultLayout from '../Layout/DefaultLayout';

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <h1>Code ở đây</h1>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;

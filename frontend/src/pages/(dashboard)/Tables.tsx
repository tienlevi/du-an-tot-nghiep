import Breadcrumb from './_components/Breadcrumbs/Breadcrumb';
import TableOne from './_components/Tables/TableOne';
import TableThree from './_components/Tables/TableThree';
import TableTwo from './_components/Tables/TableTwo';
import DefaultLayout from './Layout/DefaultLayout';

const Tables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <TableTwo />
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default Tables;

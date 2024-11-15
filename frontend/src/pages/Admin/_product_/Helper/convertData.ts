import { DataTypeConvert } from '~/constants/enum';
import { IAttribute } from '../../../../types/Product';
import _ from 'lodash';

interface IConverDataProps {
    data:
        | {
              name: string;
              key: string;
              value: string;
          }[]
        | IAttribute[]
        | { [key: string]: any };
    to: DataTypeConvert;
}
const convertData = ({ data, to }: IConverDataProps) => {
    if (to === DataTypeConvert.obj && Array.isArray(data)) {
        const dataSource = data.map((item) => _.mapValues(item, (value) => (_.isUndefined(value) ? '' : value)));
        return dataSource.reduce((acc: { [key: string]: any }, { key, value }: any) => {
            acc[key] = value;
            return acc;
        }, {});
    }
    const attributesData = Object.entries(data).map(([key, value]) => ({
        name: key.replace(/_/g, ' '),
        key,
        value: value || '',
    }));
    console.log(attributesData, 'tttt');

    return attributesData;
};

export default convertData;

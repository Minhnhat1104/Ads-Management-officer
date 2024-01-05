import SelectBox from '@base/components/SelectBox';
import React, { useEffect, useState } from 'react';
import { useCompanies } from 'src/hooks/useCompanies';

interface CompanySelectProps {
  value: any;
  onChange: any;
}

const CompanySelect = (props: CompanySelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);

  const { data } = useCompanies();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const nOptions = data?.map((_item: any) => ({
        value: _item?.id,
        label: _item?.name,
      }));
      setOptions(nOptions);
    }
  }, [data]);

  return <SelectBox options={options} value={value} onChange={onChange} />;
};

export default CompanySelect;

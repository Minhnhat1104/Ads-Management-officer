import SelectBox from '@base/components/SelectBox';
import React, { useEffect, useState } from 'react';
import { useAdTypes } from 'src/hooks/useAdTypes';

interface AdTypeSelectProps {
  value: any;
  onChange: any;
}

const AdTypeSelect = (props: AdTypeSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);

  const { data } = useAdTypes();

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

export default AdTypeSelect;

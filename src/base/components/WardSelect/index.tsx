import SelectBox from '@base/components/SelectBox';
import React, { useEffect, useState } from 'react';
import { useWards } from 'src/hooks/useWards';

interface PlacementSelectProps {
  value: any;
  onChange: any;
}

const WardSelect = (props: PlacementSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);

  const { data } = useWards();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const nOptions = data?.map((_item: any) => ({
        value: _item?.id,
        label: [_item?.wardName, _item?.district].join(', '),
      }));
      setOptions(nOptions);
    }
  }, [data]);

  return <SelectBox options={options} value={value} onChange={onChange} />;
};

export default WardSelect;

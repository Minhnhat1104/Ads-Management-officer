import SelectBox from '@base/components/SelectBox';
import React, { useEffect, useState } from 'react';
import { usePlacements } from 'src/hooks/usePlacements';

interface PlacementSelectProps {
  value: any;
  onChange: any;
}

const PlacementSelect = (props: PlacementSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);

  const { data } = usePlacements();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const nOptions = data?.map((_item: any) => ({
        value: _item?.id,
        label: [_item?.ward, _item?.district].join(', '),
      }));
      setOptions(nOptions);
    }
  }, [data]);

  return <SelectBox options={options} value={value} onChange={onChange} />;
};

export default PlacementSelect;

import SelectBox from '@base/components/SelectBox';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { usePlacementFormats } from 'src/hooks/usePlacementFormats';

interface PlacementFormatSelectProps {
  value: any;
  onChange: any;
}

const PlacementFormatSelect = (props: PlacementFormatSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { data } = usePlacementFormats();

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

export default PlacementFormatSelect;

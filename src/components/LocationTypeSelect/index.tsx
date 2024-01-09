import SelectBox from '@base/components/SelectBox';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocationTypes } from 'src/hooks/useLocationTypes';

interface LocationTypeSelectProps {
  value: any;
  onChange: any;
}

const LocationTypeSelect = (props: LocationTypeSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { data } = useLocationTypes();

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

export default LocationTypeSelect;

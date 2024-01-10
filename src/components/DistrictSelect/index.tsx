import SelectBox from '@base/components/SelectBox';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDistricts } from 'src/hooks/district/useDistricts';

interface DistrictSelectProps {
  value: any;
  onChange: any;
}

const DistrictSelect = (props: DistrictSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { data } = useDistricts();

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const nOptions = data?.map((_item: any) => ({
        value: _item?.id,
        label: _item?.districtName,
      }));
      setOptions(nOptions);
    }
  }, [data]);

  return <SelectBox options={options} value={value} onChange={onChange} />;
};

export default DistrictSelect;

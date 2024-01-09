import SelectBox from '@base/components/SelectBox';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useWards } from 'src/hooks/ward/useWards';

interface WardSelectProps {
  value: any;
  onChange: any;
}

const WardSelect = (props: WardSelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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

import SelectBox from '@base/components/SelectBox';
import { Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useCompanies } from 'src/hooks/useCompanies';
import WritePage from './Write';

interface CompanySelectProps {
  value: any;
  onChange: any;
}

const CompanySelect = (props: CompanySelectProps) => {
  const { value, onChange } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <>
      <Stack direction="row">
        <SelectBox options={options} value={value} onChange={onChange} />
        <Button onClick={() => setOpen(true)} size="small" variant="contained" sx={{ width: 160, marginLeft: 2 }}>
          Thêm công ty
        </Button>
      </Stack>
      {open && <WritePage isOpen={open} onClose={() => setOpen(false)} />}
    </>
  );
};

export default CompanySelect;

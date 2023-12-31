import { LabelValue } from '@base/types';
import { Grid, Stack, Typography, useTheme } from '@mui/material';
import React, { ReactNode } from 'react';

interface ViewFieldsProps {
  data: any;
  fieldConfigs: ViewFieldConfig[];
}

export interface ViewFieldConfig extends LabelValue {
  getValue?: (value: any, keyName: string) => string | number | ReactNode;
}

const ViewFields = (props: ViewFieldsProps) => {
  const { data, fieldConfigs } = props;
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Stack>
      {fieldConfigs?.map((_field: ViewFieldConfig, i: number) => {
        let renderValue = null;
        if (_field?.getValue) {
          if (typeof _field?.getValue(data, _field.value) === 'string') {
            renderValue = <Typography>{_field?.getValue(data, _field.value)}</Typography>;
          } else {
            renderValue = _field?.getValue(data, _field.value);
          }
        } else {
          renderValue = <Typography>{data?.[_field.value]}</Typography>;
        }

        return (
          <Grid container key={_field.value} direction="row" border={border} borderTop={i === 0 ? border : 'none'}>
            <Grid item xs={4} p={2} borderRight={border}>
              <Typography fontWeight={500}>{`${_field.label}:`}</Typography>
            </Grid>
            <Grid item xs={8} p={2}>
              {renderValue}
            </Grid>
          </Grid>
        );
      })}
    </Stack>
  );
};

export default ViewFields;

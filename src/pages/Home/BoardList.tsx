import * as React from 'react';
import { Box, ClickAwayListener, Stack, Typography, useTheme } from '@mui/material';
import { LabelValue } from '@base/types';
import NoData from '@base/components/NoData';

interface BoardListProps {
  boardData: any;
  setBoardData: React.Dispatch<any>;
}

interface FieldConfig extends LabelValue {
  getValue?: (value: any, keyName: string) => string | number;
}

const advertisementFields: FieldConfig[] = [
  {
    label: 'Chiều dài',
    value: 'width',
    getValue: (value: any, keyName: string) => value?.[keyName] + 'm',
  },
  {
    label: 'Chiều rộng',
    value: 'height',
    getValue: (value: any, keyName: string) => value?.[keyName] + 'm',
  },
  {
    label: 'Số lượng',
    value: 'amount',
  },
];

const placementFields: LabelValue[] = [
  {
    label: 'Hình thức',
    value: 'format',
  },
  {
    label: 'Phân loại',
    value: 'locationType',
  },
];

function BoardList(props: BoardListProps) {
  const { boardData, setBoardData } = props;
  console.log('🚀 ~ file: BoardList.tsx:39 ~ boardData:', boardData);
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

  return (
    <ClickAwayListener
      onClickAway={() => {
        setBoardData(null);
      }}
    >
      <Stack spacing={1} width={400} maxHeight={300} className="scroll-box" sx={{ overflowY: 'auto' }}>
        {Array.isArray(boardData?.data) && boardData?.data?.length > 0 ? (
          boardData?.data?.map((_item: any, i: number) => (
            <Box p={1} key={i}>
              {boardData.data.map((item: any, j: number) => (
                // Ensure you return the JSX elements

                <Box key={j} border={border} marginTop={'5px'} padding={'5px'}>
                  {<Typography sx={{ fontSize: 20, fontWeight: 500 }}>{item?.advertisingType}</Typography>}

                  <Stack direction="row" spacing={1}>
                    <img src={item?.image} width={120} height={120} />
                    <Stack>
                      {advertisementFields?.map((_field: FieldConfig) => (
                        <Stack key={_field.value} direction="row" spacing={0.5}>
                          <Typography fontWeight={500}>{`${_field.label}:`}</Typography>
                          <Typography>
                            {_field?.getValue ? _field?.getValue(item, _field.value) : item[_field.value]}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              ))}
            </Box>
          ))
        ) : (
          <NoData />
        )}
      </Stack>
    </ClickAwayListener>
  );
}

export default React.memo(BoardList);

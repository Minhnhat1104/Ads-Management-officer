import { ApexOptions } from 'apexcharts';
import React from 'react';
import Chart from 'react-apexcharts';
import { useReportStatistics } from 'src/hooks/useReports';

const ReportStatistics = () => {
  const { data } = useReportStatistics();
  console.log('🚀 ~ data:', data);

  const series = data?.data;

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 500,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        // endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: data?.ward || [],
    },
    yaxis: {
      title: {
        text: 'Số lượng',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {},
    },
  };

  return <Chart options={options} series={series || []} type="bar" height={350} />;
};

export default ReportStatistics;

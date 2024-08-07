import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BarChart {
  data: number[];
}
const BarChart = ({ data }: BarChart) => {
  const totalNum = data.reduce((sum, val) => {
    return sum + val;
  }, 0);
  const series = [
    {
      data,
    },
  ];
  const options: ApexOptions = {
    colors: ['#e58025'],
    chart: {
      type: 'bar',
      height: 160,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: 'around',
        horizontal: true,
        columnWidth: '80%',
        colors: {
          backgroundBarColors: ['#63605D1A'],
          backgroundBarRadius: 8,
        },
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#242220'],
        fontWeight: 400,
        fontSize: '10px',
      },
      offsetX: 30,
    },
    xaxis: {
      categories: ['Excellent', 'Good', 'Okay', 'Bad', 'Worse'],
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      min: 0,
      max: totalNum,
    },
    grid: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  };
  return (
    <div>
      <div id='chart'>
        <ReactApexChart
          options={options}
          series={series}
          type='bar'
          height={160}
        />
      </div>
    </div>
  );
};

export default BarChart;

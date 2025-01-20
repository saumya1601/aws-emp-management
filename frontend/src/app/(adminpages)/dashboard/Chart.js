"use client"

import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DepartmentChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Department Distribution',
      },
    },
  };

  const chartData = {
    labels: ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'],
    datasets: [
      {
        label: 'Department Count',
        data: [15, 50, 25, 10, 5], // Number of employees in each department
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
          'rgb(255, 159, 64)',
          'rgb(153, 102, 255)',
          'rgb(255, 205, 86)',
        ],
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full h-[200px] p-4 bg-white rounded-lg shadow-md">
      <Doughnut options={options} data={chartData} />
    </div>
  );
};

export default DepartmentChart;

"use client"

import React, { useEffect } from 'react';
import { Chart, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';

import { defaults } from "chart.js/auto";


defaults.maintainAspectRatio = false;
defaults.responsive = true

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ChartsDashboard = () => {


  const contactData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'People Contacted Us',
        data: [10, 25, 40, 35, 50, 30, 60], // Dummy data
        backgroundColor: '#42a5f5',
        borderColor: '#1e88e5',
        borderWidth: 2,
      },
    ],
  };

  const contactOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'People Contacted Us Over Time',
      },
    },
  };

  const reservationData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Audit',
        data: [15, 30, 55, 45, 70, 50, 80],
        borderColor: '#66bb6a',
        backgroundColor: '#a5d6a7',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const reservationOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Audit Over Time',
      },
    },
  };

  return (
    <div className="charts-container flex items-center flex-col 2xl:flex-row w-full gap-10 ">
      <div className='w-full bg-white p-9 rounded-xl min-h-[500px]'>
        {/* @ts-ignore */}
        <Bar data={contactData} options={contactOptions} />
      </div>
      <div className='w-full bg-white p-9 rounded-xl min-h-[500px]'>


        {/* @ts-ignore */}
        <Line data={reservationData} options={reservationOptions} />
      </div>
    </div>
  );
};

export default ChartsDashboard;

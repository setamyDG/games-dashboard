'use client';

import { RadialBar, type RadialBarConfig } from '@ant-design/plots';
import React from 'react';

export const RatingChart = () => {
  const data = [
    {
      name: 'activity1',
      percent: 2370,
      color: '#1ad5de',
    },
    {
      name: 'activity2',
      percent: 800,
      color: '#a0ff03',
    },
    {
      name: 'activity3',
      percent: 650,
      color: '#e90b3a',
    },
  ];
  const config: RadialBarConfig = {
    width: 400,
    height: 244,
    autoFit: false,
    appendPadding: [50, 0, 50, 0],
    data,
    xField: 'name',
    yField: 'percent',
    radius: 0.8,
    innerRadius: 0.2,
    xAxis: false,
    theme: 'dark',
    barBackground: {
      style: {
        fill: 'rgba(255,255,255,0.45)',
      },
    },
    barStyle: {
      lineCap: 'round',
    },
    minBarWidth: 16,
    maxBarWidth: 16,
    colorField: 'name',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    color: (datum: any, defaultColor?: string) => {
      const item = data?.find((d) => d.name === datum.name);
      return item ? item.color : defaultColor || '#000000';
    },
  };
  return <RadialBar {...config} />;
};

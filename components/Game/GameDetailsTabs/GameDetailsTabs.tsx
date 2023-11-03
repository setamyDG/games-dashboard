'use client';

import { Card, CardBody } from '@nextui-org/card';
import { Tabs, Tab } from '@nextui-org/tabs';
import { RocketIcon, ComponentNoneIcon } from '@radix-ui/react-icons';
import React from 'react';
import { AchievementCard } from '../AchievementCard/AchievementCard';
import { GameCard } from '../GameCard/GameCard';
import { GamesResult } from '@/customTypes/general';

type Props = {
  about: string;
  gameSeries: GamesResult;
  gameAchievements: GamesResult;
};

export const GameDetailsTabs = ({ about, gameSeries, gameAchievements }: Props) => {
  const renderEmptyState = () => {
    return (
      <div className='mt-4 flex flex-col items-center justify-center space-y-4'>
        <ComponentNoneIcon className='w-[50px] h-[50px]' />
        <span className='text-xl'>No data</span>
      </div>
    );
  };
  return (
    <div className='flex w-full flex-col'>
      <Tabs fullWidth aria-label='Options' color='warning' variant='bordered'>
        <Tab
          key='photos'
          title={
            <div className='flex items-center space-x-2'>
              <RocketIcon />
              <span>About</span>
            </div>
          }
        >
          <Card>
            <CardBody>{about}</CardBody>
          </Card>
        </Tab>
        <Tab
          key='music'
          title={
            <div className='flex items-center space-x-2'>
              <RocketIcon />
              <span>Related games</span>
            </div>
          }
        >
          <>
            {gameSeries?.results.length == 0 ? (
              renderEmptyState()
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 gap-4'>
                {gameSeries?.results.map((game) => <GameCard key={game.id} game={game} />)}
              </div>
            )}
          </>
        </Tab>
        <Tab
          key='videos'
          title={
            <div className='flex items-center space-x-2'>
              <RocketIcon />
              <span>Achievements</span>
            </div>
          }
        >
          <>
            {gameAchievements.results.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-3 lg:aut-fit gap-4'>
                {gameAchievements.results.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>
            )}
          </>
        </Tab>
      </Tabs>
    </div>
  );
};

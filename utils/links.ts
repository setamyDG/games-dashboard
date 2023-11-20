import { generateMonths } from './methots';
import { routes } from './routes';

const months = generateMonths();
export const getReleaseCalendarQuery = (currentMonth: string) => {
  const months = generateMonths();
  return `&dates=${months.find((month) => month.label === currentMonth)?.currentMonthDates}`;
};

export const links = (currentMonth: string) => [
  {
    title: 'New Releases',
    children: [
      {
        name: 'Last 30 days',
        path: routes.last30Days,
        description: 'Explore the latest 30-day games for thrilling adventures and immersive challenges.',
      },
      {
        name: 'This week',
        path: routes.thisWeek,
        description: 'Uncover the latest gaming experiences released this week',
      },
      {
        name: 'Next week',
        path: routes.nextWeek,
        description:
          "Unveil the upcoming week's newest gaming releases, promising thrilling adventures and exciting challenges for all players",
      },
      {
        name: 'Release calendar',
        path: `${routes.releaseCalendar}/${currentMonth}?dates=${months.find((month) => month.label === currentMonth)
          ?.currentMonthDates}`,

        description:
          'Explore the gaming release calendar, unveiling upcoming titles that promise thrilling adventures and exciting challenges for all players',
      },
    ],
  },
  {
    title: 'Top',
    children: [
      {
        name: 'Best of the year',
        path: routes.bestOfTheYear,
        description:
          "Explore the year's best games, offering thrilling adventures and exciting challenges for all players.",
      },
      {
        name: 'Popular in 2022',
        path: routes.popularIn2022,
        description:
          'Uncover the most popular games of 2022, delivering thrilling adventures and exciting challenges for all players.',
      },
      {
        name: 'All time top 250',
        path: routes.allTimeTop250,
        description:
          'Delve into the top 250 games of all time, promising timeless thrilling adventures and exciting challenges for gamers.',
      },
    ],
  },
  {
    title: 'Browse',
    children: [
      {
        name: 'Platforms',
        path: routes.platforms,
        description:
          'Explore various gaming platforms, offering a diverse range of thrilling adventures and exciting challenges for players.',
      },
    ],
  },
];

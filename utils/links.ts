import { generateMonths } from './methots';
import { routes } from './routes';

const months = generateMonths();

export const links = (currentMonth: string) => [
  {
    title: null,
    children: [
      {
        name: 'Home',
        query: '',
        path: routes.home,
        image: '/door.svg',
        isPng: false,
      },
    ],
  },
  {
    title: 'New Releases',
    children: [
      {
        name: 'Last 30 days',
        query: '',
        path: routes.last30Days,
        image: '/star.svg',
        isPng: false,
      },
      {
        name: 'This week',
        path: routes.thisWeek,
        query: '&page=1',
        image: '/fire.svg',
        isPng: false,
      },
      {
        name: 'Next week',
        path: routes.nextWeek,
        query: '&page=1',
        image: '/next-week.svg',
        isPng: false,
      },
      {
        name: 'Release calendar',
        path: `${routes.releaseCalendar}/${currentMonth}`,
        query: `&dates=${months.find((month) => month.label === currentMonth)?.currentMonthDates}`,
        image: '/calendar.svg',
        isPng: false,
      },
    ],
  },
  {
    title: 'Top',
    children: [
      {
        name: 'Best of the year',
        path: routes.bestOfTheYear,
        query: '&page=1',
        image: '/win.svg',
        isPng: false,
      },
      {
        name: 'Popular in 2022',
        path: routes.popularIn2022,
        query: '&page=1',
        image: '/chart.svg',
        isPng: false,
      },
      {
        name: 'All time top 250',
        path: routes.allTimeTop250,
        query: '&page=1',
        image: '/crown.svg',
        isPng: false,
      },
    ],
  },
  {
    title: 'Browse',
    children: [
      {
        name: 'Platforms',
        path: routes.platforms,
        query: '&page=1',
        image: '/game.svg',
        isPng: false,
      },
      // {
      //   name: 'Developers',
      //   path: routes.developers,
      //   query: '&page=1',
      //   image: '/dev.svg',
      //   isPng: false,
      // },
    ],
  },
  // {
  //   title: 'Platforms',
  //   children: [
  //     {
  //       name: 'PC',
  //       path: routes.pc,
  //       image: '/pc.svg',
  //       query: '&page=1',

  //       isPng: false,
  //     },
  //     {
  //       name: 'PlayStation',
  //       path: routes.playstation,
  //       image: '/ps.svg',
  //       query: '&page=1',

  //       isPng: false,
  //     },
  //     {
  //       name: 'Xbox One',
  //       path: routes.xbox,
  //       image: '/xbox.svg',
  //       query: '&page=1',

  //       isPng: false,
  //     },
  //   ],
  // },
  // {
  //   title: 'Genres',
  //   children: [
  //     {
  //       name: 'Action',
  //       path: routes.action,
  //       image: '/images/action.png',
  //       query: '&page=1',

  //       isPng: true,
  //     },
  //     {
  //       name: 'Strategy',
  //       path: routes.strategy,
  //       image: '/images/strategy.png',
  //       query: '&page=1',

  //       isPng: true,
  //     },
  //     {
  //       name: 'RPG',
  //       path: routes.rpg,
  //       image: '/images/rpg.png',
  //       query: '&page=1',

  //       isPng: true,
  //     },
  //     {
  //       name: 'Shooter',
  //       path: routes.shooter,
  //       image: '/images/shooter.png',
  //       query: '&page=1',

  //       isPng: true,
  //     },
  //     {
  //       name: 'Sports',
  //       path: routes.sport,
  //       image: '/images/sports.png',
  //       query: '&page=1',

  //       isPng: true,
  //     },
  //   ],
  // },
];

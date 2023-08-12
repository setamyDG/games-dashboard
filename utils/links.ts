import { routes } from './routes';

export const links = [
  {
    title: null,
    children: [
      {
        name: 'Home',
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
        path: routes.last30Days,
        image: '/star.svg',
        isPng: false,
      },
      {
        name: 'This week',
        path: routes.thisWeek,
        image: '/fire.svg',
        isPng: false,
      },
      {
        name: 'Next week',
        path: routes.nextWeek,
        image: '/next-week.svg',
        isPng: false,
      },
      {
        name: 'Release calendar',
        path: routes.releaseCalendar,
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
        image: '/win.svg',
        isPng: false,
      },
      {
        name: 'Popular in 2022',
        path: routes.popularIn2022,
        image: '/chart.svg',
        isPng: false,
      },
      {
        name: 'All time top 250',
        path: routes.allTimeTop250,
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
        image: '/game.svg',
        isPng: false,
      },
      {
        name: 'Stores',
        path: routes.stores,
        image: '/download.svg',
        isPng: false,
      },
      {
        name: 'Collections',
        path: routes.collections,
        image: '/collections.svg',
        isPng: false,
      },
      {
        name: 'Developers',
        path: routes.developers,
        image: '/dev.svg',
        isPng: false,
      },
    ],
  },
  {
    title: 'Platforms',
    children: [
      {
        name: 'PC',
        path: routes.pc,
        image: '/pc.svg',
        isPng: false,
      },
      {
        name: 'PlayStation',
        path: routes.playstation,
        image: '/ps.svg',
        isPng: false,
      },
      {
        name: 'Xbox One',
        path: routes.xbox,
        image: '/xbox.svg',
        isPng: false,
      },
    ],
  },
  {
    title: 'Genres',
    children: [
      {
        name: 'Action',
        path: routes.action,
        image: '/images/action.png',
        isPng: true,
      },
      {
        name: 'Strategy',
        path: routes.strategy,
        image: '/images/strategy.png',
        isPng: true,
      },
      {
        name: 'RPG',
        path: routes.rpg,
        image: '/images/rpg.png',
        isPng: true,
      },
      {
        name: 'Shooter',
        path: routes.shooter,
        image: '/images/shooter.png',
        isPng: true,
      },
      {
        name: 'Sports',
        path: routes.sport,
        image: '/images/sports.png',
        isPng: true,
      },
    ],
  },
];

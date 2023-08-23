// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyObject = (value: any) => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  return Object.keys(value).length === 0;
};

export const generateMonths = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  return Array.from({ length: 12 }, (_, index) => {
    const month = ((currentMonth + index) % 12) + 1; // Adding 1 to get 1-12 range
    const year = currentYear + Math.floor((currentMonth + index) / 12);
    const firstDayInMonth = new Date(year, month - 1, 1).getDate().toString().padStart(2, '0');
    const lastDayInMonth = new Date(year, month, 0).getDate().toString().padStart(2, '0');
    return {
      currentMonthDates: `${year}-${month.toString().padStart(2, '0')}-${firstDayInMonth},${year}-${month
        .toString()
        .padStart(2, '0')}-${lastDayInMonth}`,

      startDate: `${year}-${month.toString().padStart(2, '0')}-${firstDayInMonth}`,
      endDate: `${year}-${month.toString().padStart(2, '0')}-${lastDayInMonth}`,
      label: new Date(year, month - 1).toLocaleString('en-GB', { month: 'long' }),
    };
  });
};

type QueryParams = {
  search?: string;
  ordering?: string;
  page?: string;
  platforms?: string;
  dates?: string;
};

export const generateUrlFromQuery = (searchParams: QueryParams) => {
  let url = `&page=${searchParams.page || '1'}`;

  if (searchParams?.search) {
    url += `&search=${searchParams?.search}`;
  }

  if (searchParams?.ordering) {
    url += `&ordering=${searchParams?.ordering}`;
  }

  if (searchParams?.platforms) {
    url += `&platforms=${searchParams?.platforms}`;
  }

  if (searchParams.dates) {
    url += `&dates=${searchParams.dates}`;
  }
  return url;
};

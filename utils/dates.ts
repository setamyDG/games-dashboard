export const getLast30days = () => {
  const currentDate = new Date();

  const dateArray = [];

  // Generate the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - i);
    const formattedDate = date.toISOString().split('T')[0];
    dateArray.push(formattedDate);
  }

  return dateArray.join(',');
};

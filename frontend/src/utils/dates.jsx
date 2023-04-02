export const convertTimestampToDate = (ts) => {
  const unixTimestamp = ts;
  const date = new Date(unixTimestamp * 1000);

  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
  };

  const formattedDate = date.toLocaleString('tr-TR', options);
  return formattedDate;
};

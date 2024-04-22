const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return `${formattedDate}`;
};

export default formatDate;

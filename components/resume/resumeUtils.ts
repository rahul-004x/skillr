export const getYear = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.getFullYear();
};

export const getShortMonth = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-GB", { month: "short" });
};

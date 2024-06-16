export const showRecipeTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  const hourStr = hours !== 0 ? `${hours} hr${hours > 1 ? "s" : ""}` : null;
  const minuteStr =
    minutes !== 0 ? `${minutes} min${minutes > 1 ? "s" : ""}` : null;

  if (hourStr && minuteStr) return `${hourStr} ${minuteStr}`;
  if (hourStr) return hourStr;
  if (minuteStr) return minuteStr;

  return "0 mins";
};

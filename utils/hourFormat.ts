export function convertNumberToTime(number: number): string {
  const TIME_STRING_LENGTH = 4;
  const PADDING_CHAR = '0';
  const HOURS_START_INDEX = 0;
  const HOURS_END_INDEX = 2;
  const MINUTES_START_INDEX = 2;
  const MINUTES_END_INDEX = 4;

  const timeString = number.toString().padStart(TIME_STRING_LENGTH, PADDING_CHAR);
  const hours = timeString.slice(HOURS_START_INDEX, HOURS_END_INDEX);
  const minutes = timeString.slice(MINUTES_START_INDEX, MINUTES_END_INDEX);
  
  return `${hours}:${minutes}`;
}

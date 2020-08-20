export const numberSuffix = (position) => {
    const remainderTen = position % 10;
    const remainderHundred = position % 100;

    if (remainderTen === 1 && remainderHundred !== 11) {
      return position + "st";
    }
    if (remainderTen === 2 && remainderHundred !== 12) {
      return position + "nd";
    }
    if (remainderTen === 3 && remainderHundred !== 13) {
      return position + "rd";
    }
    
    return position + "th";
  }
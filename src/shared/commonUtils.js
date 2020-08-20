import React from 'react';
import Emoji from '../components/UI/Emoji';

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

export const setMedalEmoji = (position) => {
  switch (position) {
    case 1: return <Emoji symbol="🥇" label="1st place medal" />;
    case 2: return <Emoji symbol="🥈" label="2nd place medal" />;
    case 3: return <Emoji symbol="🥉" label="3rd place medal" />;
    default: return null;
  }
}
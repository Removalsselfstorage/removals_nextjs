// Outputs: "Wednesday, 20 September, 2023"








export function getCurrentDateFormatted() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const now = new Date();
  const dayOfWeek = days[now.getUTCDay()];
  const dayOfMonth = now.getUTCDate();
  const month = months[now.getUTCMonth()];
  const year = now.getUTCFullYear();
  const hours = String(now.getUTCHours()).padStart(2, "0");
  const minutes = String(now.getUTCMinutes()).padStart(2, "0");
  const seconds = String(now.getUTCSeconds()).padStart(2, "0");

  return `${dayOfWeek}, ${dayOfMonth} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}

export function generateSecureId(length = 25) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let secureId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    secureId += characters.charAt(randomIndex);
  }

  return secureId;
}

// Example usage:
const secureId = generateSecureId();
// console.log(secureId);

export function convertDateFormat(inputDate) {
  // Use the replace method to replace '/' with '-'
  var formattedDate = inputDate?.replace(/\//g, "-");
  return formattedDate;
}

export function convertUTCToLocal(utcTimestamp) {
  const options = { timeZone: "Africa/Lagos" };
  const utcDate = new Date(utcTimestamp);
  const localDate = new Date(
    utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
  ).toLocaleString(undefined, options);
  return localDate;
}

export function convertToLagosTime(utcDateString) {
  const utcDate = new Date(utcDateString);
  const lagosOffset = 1; // Africa/Lagos is UTC+1

  const localTime = new Date(utcDate.getTime() + lagosOffset * 3600000); // Convert milliseconds to hours

  return localTime;
}

export const filterSections = (sections, condition1) => {
  if (condition1) {
    return sections.filter(
      (section) => section.title !== "Add a Profile Picture!"
    );
  }
  // if (condition2) {
  //   return sections.filter(section => section.title !== "Add a Profile Picture!");
  // }
  return sections;
};

export function combineInitials(firstName, lastName) {
  if (firstName?.length > 0 && lastName?.length > 0) {
    const combinedInitials = (firstName[0] + lastName[0]).toUpperCase();
    return combinedInitials;
  } else {
    // console.log(
    //   "Both first name and last name must have at least one character."
    // );
    return null;
  }
}

export function trimToFirstLetter(word) {
  if (typeof word !== "string" || word.length === 0) {
    return "";
  }

  return word.charAt(0).toUpperCase();
}

export function trimFirstTwoLetters(word) {
  if (typeof word !== "string" || word.length < 2) {
    return word;
  }

  return word.substring(2);
}

export const truncateTexts = (text, count) => {
  return text?.length > count ? text.slice(0, count) + "..." : text;
};

export function convertToSentenceCase(text) {
  if (text.length === 0) {
    return text; // Return empty string if the input is empty
  }

  const lowercasedText = text.toLowerCase();
  const firstChar = lowercasedText.charAt(0).toUpperCase();

  return firstChar + lowercasedText.slice(1);
}

export function generateRandomValues() {
  const allowedChars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 8;
  let randomValue = "rs";

  for (let i = 0; i < length - 2; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    randomValue += allowedChars[randomIndex];
  }

  return randomValue;
}

export function calculatePrice(
  startingPrice,
  generalDecrementPercentage,
  dailyDecrementPercentages
) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let currentPrice = startingPrice;
  const updatedPrices = [];

  for (let i = 0; i < daysOfWeek.length; i++) {
    const day = daysOfWeek[i];
    const decrementPercentage = dailyDecrementPercentages[i];
    const totalDecrementPercentage =
      generalDecrementPercentage + decrementPercentage;
    const decrementAmount = currentPrice * (totalDecrementPercentage / 100);
    currentPrice -= decrementAmount;
    updatedPrices.push({ day, price: currentPrice });
  }

  return updatedPrices;
}

export function trimDate(dateString) {
  const date = new Date(dateString);
  const trimmedDate = date.toDateString().replace(/\s\d{4}$/, "");
  return trimmedDate;
}

// Example usage:
//   const dateDetails = 'Wed Aug 16 2023';
//   const trimmedDate = trimDate(dateDetails);
//   console.log(trimmedDate); // Output: "Wed Aug 16"

export function calculatePriceDecrease(
  dayOfWeek,
  dayNumber,
  month,
  year,
  price,
  generalDecrement,
  decrementPercentages
) {
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const initialDate = new Date(year, monthMap[month], dayNumber);
  const increasedDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 5,
    initialDate.getDate()
  );

  const totalDays = Math.ceil(
    (increasedDate - initialDate) / (1000 * 60 * 60 * 24)
  );

  const resultArray = [];
  let currentDate = initialDate;
  let currentPrice = price;
  let id = 1;
  while (currentDate <= increasedDate) {
    const decrementPercentage = decrementPercentages[dayMap[dayOfWeek]];
    const priceDecrease =
      currentPrice * (generalDecrement + decrementPercentage);
    currentPrice -= priceDecrease;

    const formattedPrice =
      currentPrice % 1 === 0 ? currentPrice : currentPrice.toFixed(0);
    resultArray.push({
      id: id,
      date: currentDate.toDateString(),
      price: formattedPrice,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    id++;
  }

  return resultArray;
}

export function calculatePriceChange(
  dayOfWeek,
  dayNumber,
  month,
  year,
  price,
  generalDecrement,
  sundayIncrement
) {
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const initialDate = new Date(year, monthMap[month], dayNumber);
  const increasedDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 5,
    initialDate.getDate()
  );

  const resultArray = [];
  let currentDate = initialDate;
  let currentPrice = price;
  let id = 1;
  while (currentDate <= increasedDate) {
    const dayOfWeekIndex = dayMap[dayOfWeek];
    const decrementPercentage = dayOfWeekIndex === 0 ? 0 : generalDecrement;
    const priceChange =
      dayOfWeekIndex === 0
        ? currentPrice * sundayIncrement
        : -(currentPrice * decrementPercentage);
    currentPrice += priceChange;

    const formattedPrice = parseFloat(currentPrice.toFixed(0));
    resultArray.push({
      id: id,
      date: currentDate.toDateString(),
      price: formattedPrice,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    id++;
  }

  return resultArray;
}

export function generatePriceList2(
  dayOfWeek,
  dayNumber,
  month,
  year,
  priceFirstDay,
  priceFridays,
  priceSaturdays,
  priceSundays,
  priceOtherDays
) {
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const initialDate = new Date(year, monthMap[month], dayNumber);

  const resultArray = [];
  let currentDate = initialDate;
  let currentPrice;

  let isFriday = dayOfWeek === "Fri";
  let isSunday = dayOfWeek === "Sun";
  let isSaturday = dayOfWeek === "Sat";

  for (let i = 0; i < 150; i++) {
    if (i === 0) {
      currentPrice = priceFirstDay;
    } else if (isFriday) {
      currentPrice = priceFridays;
    } else if (isSaturday) {
      currentPrice = priceSaturdays;
    } else if (isSunday) {
      currentPrice = priceSundays;
    } else {
      currentPrice = priceOtherDays;
    }

    resultArray.push({
      id: i + 1,
      date: currentDate.toDateString(),
      price: currentPrice,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    isSunday = currentDate.getDay() === 0;
    isFriday = currentDate.getDay() === 5;
    isSaturday = currentDate.getDay() === 6;
  }

  return resultArray;
}

export function generatePriceList3(
  dayOfWeek,
  dayNumber,
  month,
  year,
  priceFirstDay,
  priceFridays,
  priceSaturdays,
  priceSundays,
  priceOtherDays,
  priceFridaysAfter3Weeks,
  priceSaturdaysAfter3Weeks,
  priceSundaysAfter3Weeks,
  priceOtherDaysAfter3Weeks
) {
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const monthMap = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const initialDate = new Date(year, monthMap[month], dayNumber);

  const resultArray = [];
  let currentDate = initialDate;
  let currentPrice;

  let isFriday = dayOfWeek === "Fri";
  let isSunday = dayOfWeek === "Sun";
  let isSaturday = dayOfWeek === "Sat";

  for (let i = 0; i < 150; i++) {
    if (i === 0) {
      currentPrice = priceFirstDay;
    } else if (isFriday) {
      currentPrice = i >= 21 ? priceFridaysAfter3Weeks : priceFridays;
    } else if (isSaturday) {
      currentPrice = i >= 21 ? priceSaturdaysAfter3Weeks : priceSaturdays;
    } else if (isSunday) {
      currentPrice = i >= 21 ? priceSundaysAfter3Weeks : priceSundays;
    } else {
      currentPrice = i >= 21 ? priceOtherDaysAfter3Weeks : priceOtherDays;
    }

    resultArray.push({
      id: i + 1,
      date: currentDate.toDateString(),
      price: currentPrice,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    isSunday = currentDate.getDay() === 0;
    isFriday = currentDate.getDay() === 5;
    isSaturday = currentDate.getDay() === 6;
  }

  return resultArray;
}

export function generatePriceList23(
  dayOfWeek,
  dayNumber,
  month,
  year,
  priceFirstDay,
  priceSecondDay,
  priceThirdDay,
  priceSaturdays,
  priceSundays,
  priceOtherDays
) {
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  const monthMap = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };

  const initialDate = new Date(year, monthMap[month], dayNumber);

  const resultArray = [];
  let currentDate = initialDate;
  let currentPrice;

  let isSunday = dayOfWeek === "Sun";
  let isSaturday = dayOfWeek === "Sat";

  for (let i = 0; i < 90; i++) {
    if (i === 0) {
      currentPrice = priceFirstDay;
    } else if (i === 1) {
      currentPrice = priceSecondDay;
    } else if (i === 2) {
      currentPrice = priceThirdDay;
    } else if (isSaturday) {
      currentPrice = priceSaturdays;
    } else if (isSunday) {
      currentPrice = priceSundays;
    } else {
      currentPrice = priceOtherDays;
    }

    const formattedDate = currentDate.toISOString().split("T")[0];
    resultArray.push({
      id: i + 1,
      date: currentDate.toDateString(),
      price: currentPrice,
      date2: formattedDate,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    isSunday = currentDate.getDay() === 0;
    isSaturday = currentDate.getDay() === 6;
  }

  return resultArray;
}

export function decreaseByPercentage(value, decreasePercentage) {
  const decreaseAmount = (decreasePercentage / 100) * value;
  const result = value - decreaseAmount;
  return result;
}

export function increaseByPercentage(value, increasePercentage) {
  const increaseAmount = (increasePercentage / 100) * value;
  const result = value - -increaseAmount;
  return result;
}

export function getFormattedTodayDate() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const today = new Date();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = monthsOfYear[today.getMonth()];
  const dayOfMonth = today.getDate();

  const formattedDate = `${dayOfWeek} ${month} ${dayOfMonth}`;
  return formattedDate;
}

export function generatePriceArray(
  dayOfWeek,
  month,
  dayNumber,
  year,
  defaultPrice,
  pricesForSundaysForFirst3Weeks,
  pricesForMondaysToThursdaysForFirst3Weeks,
  pricesForFridaysToSaturdaysForFirst3Weeks,
  pricesForSundaysAfter3Weeks,
  pricesForMondaysToThursdaysAfter3Weeks,
  pricesForFridaysToSaturdaysAfter3Weeks
) {
  const priceArray = [];

  function calculatePrice(weekday, isFirst3Weeks) {
    if (weekday === "Sun") {
      return isFirst3Weeks
        ? defaultPrice * (1 + pricesForSundaysForFirst3Weeks / 100)
        : defaultPrice * (1 + pricesForSundaysAfter3Weeks / 100);
    } else if (weekday === "Fri" || weekday === "Sat") {
      return isFirst3Weeks
        ? defaultPrice * (1 + pricesForFridaysToSaturdaysForFirst3Weeks / 100)
        : defaultPrice * (1 + pricesForFridaysToSaturdaysAfter3Weeks / 100);
    } else {
      return isFirst3Weeks
        ? defaultPrice * (1 + pricesForMondaysToThursdaysForFirst3Weeks / 100)
        : defaultPrice * (1 + pricesForMondaysToThursdaysAfter3Weeks / 100);
    }
  }

  const startDate = new Date(`${month} ${dayNumber}, ${year}`);
  let currentDate = startDate;
  let isFirst3Weeks = true;

  for (let i = 0; i < 42; i++) {
    // Assuming we generate prices for up to 42 days (6 weeks)
    const id = i + 1;
    const date = currentDate.toISOString().split("T")[0];
    const price = calculatePrice(
      currentDate.toLocaleString("en-us", { weekday: "short" }),
      isFirst3Weeks
    );

    priceArray.push({ id, date, price });

    currentDate.setDate(currentDate.getDate() + 1);

    if (currentDate.getDate() > 21 && isFirst3Weeks) {
      isFirst3Weeks = false;
    }
  }

  return priceArray;
}

// Example usage with the provided constants
// const dayOfWeek = "Sun";
// const month = "Jul";
// const dayNumber = 26;
// const year = 2023;
// const defaultPrice = 100;
// const pricesForSundaysForFirst3Weeks = 4;
// const pricesForMondaysToThursdaysForFirst3Weeks = 3;
// const pricesForFridaysToSaturdaysForFirst3Weeks = 0;
// const pricesForSundaysAfter3Weeks = 4;
// const pricesForMondaysToThursdaysAfter3Weeks = 3;
// const pricesForFridaysToSaturdaysAfter3Weeks = 2.5;

// const priceArray = generatePriceArray(
//   dayOfWeek,
//   month,
//   dayNumber,
//   year,
//   defaultPrice,
//   pricesForSundaysForFirst3Weeks,
//   pricesForMondaysToThursdaysForFirst3Weeks,
//   pricesForFridaysToSaturdaysForFirst3Weeks,
//   pricesForSundaysAfter3Weeks,
//   pricesForMondaysToThursdaysAfter3Weeks,
//   pricesForFridaysToSaturdaysAfter3Weeks
// );

// console.log(priceArray);

export function generatePrices(
  dayOfWeek,
  dayNumber,
  month,
  year,
  firstDayPrice,
  weekdaysPrice,
  fridaysSaturdaysPrice,
  sundaysPrice,
  weekdaysPriceAfter3Weeks,
  fridaysSaturdaysPriceAfter3Weeks,
  sundaysPriceAfter3Weeks
) {
  const dayAbbreviations = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dayIndex = dayAbbreviations.indexOf(dayOfWeek);
  const monthIndex = monthAbbreviations.indexOf(month);

  // if (dayIndex === -1) {
  //   throw new Error('Invalid dayOfWeek. Please provide an abbreviated string (e.g., "Mon", "Tue", etc.).');
  // }

  // if (monthIndex === -1) {
  //   throw new Error('Invalid month. Please provide an abbreviated string (e.g., "Jan", "Feb", etc.).');
  // }

  const pricesArray = [];

  let currentDate = new Date(year, monthIndex, dayNumber);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay() + dayIndex); // Move to the provided dayOfWeek
  let isFirstThreeWeeks = true;

  for (let i = 0; i < 5 * 30; i++) {
    // 5 months, assuming 30 days per month

    let price = isFirstThreeWeeks
      ? firstDayPrice
      : dayIndex === 0
      ? sundaysPriceAfter3Weeks
      : dayIndex === 5 || dayIndex === 6
      ? fridaysSaturdaysPriceAfter3Weeks
      : weekdaysPriceAfter3Weeks;

    if (isFirstThreeWeeks) {
      if (dayIndex === 0) price = sundaysPrice;
      else if (dayIndex === 5 || dayIndex === 6) price = fridaysSaturdaysPrice;
      else price = weekdaysPrice;
    }

    const priceObject = {
      id: i + 1,
      date: currentDate.toDateString(),
      price: price,
    };
    pricesArray.push(priceObject);

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
    dayIndex = currentDate.getDay();

    // Check if the 3-week period has ended
    if (i === 20) {
      isFirstThreeWeeks = false;
    }
  }

  return pricesArray;
}

// Example usage:
const dayOfWeek = "Mon"; // Monday (Abbreviated string format)
const dayNumber = 1;
const month = "Aug"; // August (Abbreviated string format)
const year = 2023;

const prices = generatePrices(
  dayOfWeek,
  dayNumber,
  month,
  year,
  10,
  8,
  12,
  15,
  12,
  18,
  20
);
// console.log(prices);

export function validatePhoneNumber(phoneNumber) {
  // Remove any non-digit characters from the input
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  // Check if the cleaned number contains 10 digits
  if (cleanedNumber.length !== 10) {
    return false;
  }

  // Check if the first digit is between 2 and 9
  if (cleanedNumber.charAt(0) < "2" || cleanedNumber.charAt(0) > "9") {
    return false;
  }

  // All checks pass, the number is valid
  return true;
}

export function sortByRatingAndHireCount(movers) {
  movers?.sort((a, b) => {
    // Sort by highest rating first
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }
    // If ratings are equal, sort by highest hireCount
    return b.hireCount - a.hireCount;
  });
}

export function getFirstSortedHomeMover(movers) {
  movers?.sort((a, b) => {
    // Sort by highest rating first
    // if (a.rating !== b.rating) {
    //   return b.rating - a.rating;
    // }
    // If ratings are equal, sort by highest hireCount
    return b.score - a.score;
  });

  return movers[0];
}

export function sortHomeMoversAndExcludeHighest(movers) {
  movers?.sort((a, b) => {
    const averageA = (a.rating + a.hireCount) / 2;
    const averageB = (b.rating + b.hireCount) / 2;

    // Sort by lowest average first (ascending order)
    return averageA - averageB;
  });

  // Clone the sorted array to avoid modifying the original data
  const sortedMovers = [...movers];

  // Remove the highest-rated and most hired mover
  sortedMovers.pop();

  return sortedMovers;
}

// The sorted homeMovers array excluding the highest-rated and most hired mover

export function calculateMoverPrice(
  initialPrice,
  averageRatingHireCount,
  percentageIfAverageIsOne
) {
  // Calculate the price based on the average of rating and hireCount
  let price = initialPrice * averageRatingHireCount * percentageIfAverageIsOne;

  // Round the price to two decimal places
  price = Math.round(price * 100) / 100;

  return price;
}

export function changeFontWeight(sentence, targetPhrase) {
  // Find the starting index of the target phrase in the sentence
  const startIndex = sentence?.indexOf(targetPhrase);

  // If the target phrase is not found, return the original sentence
  if (startIndex === -1) {
    console.error("Target phrase not found");
    return sentence;
  }

  // Build the modified sentence

  return (
    <>
      {sentence?.slice(0, startIndex)}{" "}
      <span className="font-bold">{targetPhrase}</span>
      {sentence?.slice(startIndex + targetPhrase.length)}
    </>
  );
}

export function changeFontWeight2(sentence, targetPhrase) {
  // Initialize the modified sentence
  let modifiedSentence = sentence;

  // Find the starting index of the first occurrence of the target phrase
  let startIndex = modifiedSentence?.indexOf(targetPhrase);

  // While the target phrase is found in the sentence
  while (startIndex !== -1) {
    // Build the modified sentence with the current occurrence wrapped in a <span>
    modifiedSentence = (
      <>
        {modifiedSentence?.slice(0, startIndex)}
        <span className="font-bold">{targetPhrase}</span>
        {modifiedSentence?.slice(startIndex + targetPhrase.length)}
      </>
    );

    // Find the starting index of the next occurrence of the target phrase
    startIndex = modifiedSentence?.indexOf(targetPhrase);
  }

  // Return the final modified sentence
  return modifiedSentence;
}

function boldenPhrase(sentence, phrase) {
  // Use a regular expression to globally replace the phrase with a bold version
  const boldenedSentence = sentence.replace(
    new RegExp(phrase, "gi"),
    "<strong>$&</strong>"
  );
  return boldenedSentence;
}

// Example usage:
const originalSentence = "The quick brown fox jumps over the lazy dog.";
const phraseToBolden = "fox";
const boldenedResult = boldenPhrase(originalSentence, phraseToBolden);
// console.log(boldenedResult);

export const truncateTexts = (text, count) => {
  return text?.length > count ? text.slice(0, count) + '...' : text;
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
  const values = [];
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  for (let i = 0; i < 8; i++) {
    const randomType = Math.random() < 0.5 ? 'string' : 'number';

    if (randomType === 'string') {
      let randomChar;
      for (let j = 0; j < 2; j++) {
        randomChar = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        // randomString += randomChar;
      }
      values.push(randomChar);
    } else {
      const randomNumber = Math.floor(Math.random() * 100);
      values.push(`${randomNumber}`);
    }
  }

  return values;
}

export function calculatePrice(
  startingPrice,
  generalDecrementPercentage,
  dailyDecrementPercentages
) {
  const daysOfWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
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
  const trimmedDate = date.toDateString().replace(/\s\d{4}$/, '');
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

// Example usage
//   const dayOfWeek = "Mon";
//   const dayNumber = 15;
//   const month = "Apr";
//   const year = 2023;
//   const price = 100;
//   const generalDecrement = 0.02;
//   const decrementPercentages = {
//     Sun: 0.01,
//     Mon: 0.02,
//     Tue: 0.03,
//     Wed: 0.04,
//     Thu: 0.05,
//     Fri: 0.06,
//     Sat: 0.07
//   };

//   const result = calculatePriceDecrease(dayOfWeek, dayNumber, month, year, price, generalDecrement, decrementPercentages);
//   console.log(result);

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

// Example usage
//   const dayOfWeek = "Mon";
//   const dayNumber = 15;
//   const month = "Apr";
//   const year = 2023;
//   const price = 100;
//   const generalDecrement = 0.02;
//   const sundayIncrement = 0.05;

//   const result = calculatePriceChange(dayOfWeek, dayNumber, month, year, price, generalDecrement, sundayIncrement);
//   console.log(result);

export function generatePriceList2(
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

  let isSunday = dayOfWeek === 'Sun';
  let isSaturday = dayOfWeek === 'Sat';

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

    resultArray.push({
      id: i + 1,
      date: currentDate.toDateString(),
      price: currentPrice,
    });

    currentDate.setDate(currentDate.getDate() + 1);
    isSunday = currentDate.getDay() === 0;
    isSaturday = currentDate.getDay() === 6;
  }

  return resultArray;
}

export function generatePriceList23(dayOfWeek, dayNumber, month, year, priceFirstDay, priceSecondDay, priceThirdDay, priceSaturdays, priceSundays, priceOtherDays) {
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6
  };

  const monthMap = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12'
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

    const formattedDate = currentDate.toISOString().split('T')[0];
    resultArray.push({
      id: i + 1,
      date: currentDate.toDateString(),
      price: currentPrice,
      date2: formattedDate
    });

    currentDate.setDate(currentDate.getDate() + 1);
    isSunday = currentDate.getDay() === 0;
    isSaturday = currentDate.getDay() === 6;
  }

  return resultArray;
}






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
    movers.sort((a, b) => {
      // Sort by highest rating first
      if (a.rating !== b.rating) {
        return b.rating - a.rating;
      }
      // If ratings are equal, sort by highest hireCount
      return b.hireCount - a.hireCount;
    });
}
  
export function getFirstSortedHomeMover(movers) {
  movers.sort((a, b) => {
    // Sort by highest rating first
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }
    // If ratings are equal, sort by highest hireCount
    return b.hireCount - a.hireCount;
  });

  return movers[0];
}
   

export function sortHomeMoversAndExcludeHighest(movers) {
  movers.sort((a, b) => {
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

export function calculateMoverPrice(initialPrice, averageRatingHireCount, percentageIfAverageIsOne) {
  // Calculate the price based on the average of rating and hireCount
  let price = initialPrice * averageRatingHireCount * percentageIfAverageIsOne;

  

  // Round the price to two decimal places
  price = Math.round(price * 100) / 100;

  return price;
}



  
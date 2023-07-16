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

export function increaseDateByThreeMonths(dayOfWeek, dayNumber, month, year) {
  // Map the day of the week to day number
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  // Map the month name to month number
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

  // Create the initial date
  const initialDate = new Date(year, monthMap[month], dayNumber);

  // Increase the date by three months
  const increasedDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 3,
    initialDate.getDate()
  );

  // Create the array of objects
  const datesArray = [];
  let currentDate = initialDate;
  while (currentDate <= increasedDate) {
    datesArray.push({
      originalDate: currentDate.toDateString(),
      increasedDate: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      ).toDateString(),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return datesArray;
}

// Example usage
//   const dayOfWeek = "Mon";
//   const dayNumber = 15;
//   const month = "Apr";
//   const year = 2023;

//   const result = increaseDateByThreeMonths(dayOfWeek, dayNumber, month, year);
//   console.log(result);

export function calculatePriceDecrease(
  dayOfWeek,
  dayNumber,
  month,
  year,
  price,
  generalDecrement,
  decrementPercentages
) {
  // Map the day of the week to day number
  const dayMap = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  // Map the month name to month number
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

  // Create the initial date
  const initialDate = new Date(year, monthMap[month], dayNumber);

  // Increase the date by three months
  const increasedDate = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 3,
    initialDate.getDate()
  );

  // Calculate the number of days between the initial date and the increased date
  const totalDays = Math.ceil(
    (increasedDate - initialDate) / (1000 * 60 * 60 * 24)
  );

  // Create the array of objects
  const resultArray = [];
  let currentDate = initialDate;
  let currentPrice = price;
  let id = 1;
  while (currentDate <= increasedDate) {
    const decrementPercentage = decrementPercentages[dayMap[dayOfWeek]];
    const priceDecrease =
      currentPrice * (generalDecrement + decrementPercentage);
    currentPrice -= priceDecrease;

    resultArray.push({
      id: id,
      date: currentDate.toDateString(),
      price: currentPrice.toFixed(2),
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
//   const generalDecrement = 0.02; // 2% decrement
//   const decrementPercentages = {
//     Sun: 0.01, // 1% decrement for Sunday
//     Mon: 0.02, // 2% decrement for Monday
//     Tue: 0.03, // 3% decrement for Tuesday
//     Wed: 0.04, // 4% decrement for Wednesday
//     Thu: 0.05, // 5% decrement for Thursday
//     Fri: 0.06, // 6% decrement for Friday
//     Sat: 0.07  // 7% decrement for Saturday
//   };

//   const result = calculatePriceDecrease(dayOfWeek, dayNumber, month, year, price, generalDecrement, decrementPercentages);
//   console.log(result);

export function calculatePriceDecrease2(
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
    initialDate.getMonth() + 3,
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
      currentPrice % 1 === 0 ? currentPrice : currentPrice.toFixed(2);
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

//   const result2 = calculatePriceDecrease2(dayOfWeek, dayNumber, month, year, price, generalDecrement, decrementPercentages);
//   console.log(result);

export function calculatePrice(startingPrice, generalDecrementPercentage, dailyDecrementPercentages) {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    let currentPrice = startingPrice;
    const updatedPrices = [];
  
    for (let i = 0; i < daysOfWeek.length; i++) {
      const day = daysOfWeek[i];
      const decrementPercentage = dailyDecrementPercentages[i];
      const totalDecrementPercentage = generalDecrementPercentage + decrementPercentage;
      const decrementAmount = currentPrice * (totalDecrementPercentage / 100);
      currentPrice -= decrementAmount;
      updatedPrices.push({ day, price: currentPrice });
    }
  
    return updatedPrices;
  }
  
  // Example usage:
//   const startingPrice = 100;
//   const generalDecrementPercentage = 2;
//   const dailyDecrementPercentages = [-1, -1, 0, 1, 1, 0, 3];
  
//   const updatedPrices = calculatePrice(startingPrice, generalDecrementPercentage, dailyDecrementPercentages);
//   console.log(updatedPrices);
  


export function calculatePriceDecrease3(dayOfWeek, dayNumber, month, year, price, generalDecrement, decrementPercentages) {
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
      Dec: 11
    };
  
    const initialDate = new Date(year, monthMap[month], dayNumber);
    const increasedDate = new Date(initialDate.getFullYear(), initialDate.getMonth() + 3, initialDate.getDate());
  
    const resultArray = [];
    let currentDate = initialDate;
    let currentPrice = price;
    // console.log(currentPrice)
    let id = 1;
    while (currentDate <= increasedDate) {
      const decrementPercentage = decrementPercentages[dayMap[dayOfWeek]];
      const priceDecrease = currentPrice * (generalDecrement + decrementPercentage);
      currentPrice -= priceDecrease;
  
      const formattedPrice = Number.isInteger(currentPrice) ? currentPrice : parseFloat(currentPrice.toFixed(2));
    //   console.log(formattedPrice)
      resultArray.push({
        id: id,
        date: currentDate.toDateString(),
        price: formattedPrice
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
  
//   const result = calculatePriceDecrease3(dayOfWeek, dayNumber, month, year, price, generalDecrement, decrementPercentages);
//   console.log(result);
  


  export function trimDate(dateString) {
    const date = new Date(dateString);
    const trimmedDate = date.toDateString().replace(/\s\d{4}$/, '');
    return trimmedDate;
  }
  
  // Example usage:
//   const dateDetails = 'Wed Aug 16 2023';
//   const trimmedDate = trimDate(dateDetails);
//   console.log(trimmedDate); // Output: "Wed Aug 16"

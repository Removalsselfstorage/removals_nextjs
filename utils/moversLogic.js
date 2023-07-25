export function formatDate(inputDate) {
    const months = {
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
  
    const parts = inputDate.split(' ');
    const year = parts[3];
    const month = months[parts[1]];
    const day = parts[2];
  
    return `${year}-${month}-${day}`;
  }

  export const priceCalc = (title, duration, movers) => {
    switch (title) {
      case "STANDARD":
        switch (movers) {
          case "1 Man":
            return (57.99 * duration).toFixed(0);
            break;
          case "2 Men":
            return (65.99 * duration).toFixed(0);
            break;
          case "3 Men":
            return (75.99 * duration).toFixed(0);
            break;

          default:
            break;
        }
        break;
      case "GOLD":
        switch (movers) {
          case "1 Man":
            return (60.99 * duration).toFixed(0);
            break;
          case "2 Men":
            return (70.99 * duration).toFixed(0);
            break;
          case "3 Men":
            return (78.99 * duration).toFixed(0);
            break;

          default:
            break;
        }
        break;
      case "PREMIUM":
        switch (movers) {
          case "1 Man":
            return (63.99 * duration).toFixed(0);
            break;
          case "2 Men":
            return (79.99 * duration).toFixed(0);
            break;
          case "3 Men":
            return (93.99 * duration).toFixed(0);
            break;

          default:
            break;
        }
        break;
      case "PREMIUM PLUS":
        switch (movers) {
          case "1 Man":
            return (70.99 * duration).toFixed(0);
            break;
          case "2 Men":
            return (95.99 * duration).toFixed(0);
            break;
          case "3 Men":
            return (110.99 * duration).toFixed(0);
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  };


  export const moveDesciptionsCalc = (title, propertyType) => {
    switch (propertyType) {
      case "Office removals":
        switch (title) {
          case "STANDARD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "450 cubic ft loading capacity",
            };
            break;
          case "GOLD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "550 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "660 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM PLUS":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "Free packing service",
              f9: "Free mattress cover",
              f10: "840 Cubic ft loading capacity",
            };
            break;

          default:
            break;
        }
        break;
      case "Studio flat":
        switch (title) {
          case "STANDARD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "450 cubic ft loading capacity",
            };
            break;
          case "GOLD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "550 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "660 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM PLUS":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "Free packing service",
              f9: "Free mattress cover",
              f10: "840 Cubic ft loading capacity",
            };
            break;

          default:
            break;
        }
        break;
      case "Furniture & Appliances":
        switch (title) {
          case "STANDARD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "450 cubic ft loading capacity",
            };
            break;
          case "GOLD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "550 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "660 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM PLUS":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f7: "Free packing service",
              f7: "Free mattress cover",
              f8: "840 Cubic ft loading capacity",
            };
            break;

          default:
            break;
        }
        break;
      case "PREMIUM PLUS":
        switch (title) {
          case "STANDARD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "450 cubic ft loading capacity",
            };
            break;
          case "GOLD":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "550 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f8: "660 Cubic ft loading capacity",
            };
            break;
          case "PREMIUM PLUS":
            return {
              f1: "Free Mileage",
              f2: "Minimum 3 hours hire",
              f3: "Item dismantling / assembling",
              f4: "Load/unload Blankets",
              f5: "Trolly & straps",
              f6: "Help load/unload",
              f7: "Shrink Wrapping services",
              f7: "Free packing service",
              f7: "Free mattress cover",
              f8: "840 Cubic ft loading capacity",
            };
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  };
  
  
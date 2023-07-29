export function formatDate(inputDate) {
  const months = {
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

  const parts = inputDate.split(" ");
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
          return (57.99 * duration).toFixed(2);
          break;
        case "2 Men":
          return (65.99 * duration).toFixed(2);
          break;
        case "3 Men":
          return (75.99 * duration).toFixed(2);
          break;

        default:
          break;
      }
      break;
    case "GOLD":
      switch (movers) {
        case "1 Man":
          return (60.99 * duration).toFixed(2);
          break;
        case "2 Men":
          return (70.99 * duration).toFixed(2);
          break;
        case "3 Men":
          return (78.99 * duration).toFixed(2);
          break;

        default:
          break;
      }
      break;
    case "PREMIUM":
      switch (movers) {
        case "1 Man":
          return (63.99 * duration).toFixed(2);
          break;
        case "2 Men":
          return (79.99 * duration).toFixed(2);
          break;
        case "3 Men":
          return (93.99 * duration).toFixed(2);
          break;

        default:
          break;
      }
      break;
    case "PREMIUM PLUS":
      switch (movers) {
        case "1 Man":
          return (70.99 * duration).toFixed(2);
          break;
        case "2 Men":
          return (95.99 * duration).toFixed(2);
          break;
        case "3 Men":
          return (110.99 * duration).toFixed(2);
          break;

        default:
          break;
      }
      break;

    default:
      break;
  }
};

export const priceCalc2 = (title, mileage, movers, propertyType) => {
  switch (propertyType) {
    case "1 bed property":
      switch (title) {
        case "STANDARD":
          switch (movers) {
            case "1 Man":
              return (171.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (171.99 + 40 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (171.99 + 95 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "GOLD":
          switch (movers) {
            case "1 Man":
              return (198.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (198.99 + 50 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (198.99 + 120 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM":
          switch (movers) {
            case "1 Man":
              return (240.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (240.99 + 70 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (240.99 + 150 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM PLUS":
          switch (movers) {
            case "1 Man":
              return (298.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (298.99 + 120 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (298.99 + 240 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
      }
      break;
    case "2 bed property":
      switch (title) {
        case "STANDARD":
          switch (movers) {
            case "1 Man":
              return (200.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (200.99 + 70 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (200.99 + 170 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "GOLD":
          switch (movers) {
            case "1 Man":
              return (230.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (230.99 + 100 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (230.99 + 180 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM":
          switch (movers) {
            case "1 Man":
              return (280.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (280.99 + 150 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (280.99 + 270 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM PLUS":
          switch (movers) {
            case "1 Man":
              return (390.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (390.99 + 230 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (390.99 + 330 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
      }
      break;
    case "3 bed property":
      switch (title) {
        case "STANDARD":
          switch (movers) {
            case "1 Man":
              return (370.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (370.99 + 180 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (370.99 + 260 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "GOLD":
          switch (movers) {
            case "1 Man":
              return (390.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (390.99 + 190 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (390.99 + 270 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM":
          switch (movers) {
            case "1 Man":
              return (390.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (280.99 + 320 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (280.99 + 460 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM PLUS":
          switch (movers) {
            case "1 Man":
              return (440.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (440.99 + 420 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (440.99 + 490 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
      }
      break;
    case "4 bed property":
      switch (title) {
        case "STANDARD":
          switch (movers) {
            case "1 Man":
              return (360.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (360.99 + 320 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (360.99 + 390 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "GOLD":
          switch (movers) {
            case "1 Man":
              return (400.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (400.99 + 350 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (400.99 + 450 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM":
          switch (movers) {
            case "1 Man":
              return (450.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (450.99 + 380 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (450.99 + 480 + mileage).toFixed(0);
              break;

            default:
              break;
          }
          break;
        case "PREMIUM PLUS":
          switch (movers) {
            case "1 Man":
              return (550.99 + 0 + mileage).toFixed(0);
              break;
            case "2 Men":
              return (550.99 + 440 + mileage).toFixed(0);
              break;
            case "3 Men":
              return (550.99 + 540 + mileage).toFixed(0);
              break;

            default:
              break;
          }
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
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Standard insurance cover",
            f7: "Cancel up to 1 week before your move",
            f8: "450 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Help Load / unload",
            f7: "Standard insurance cover",
            f8: "Cancel up to 1 week before your move",
            f10: "550 Cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Help Load / unload",
            f7: "Shrink Wrapping services",
            f8: "Moving Concierge",
            f9: "Comprehensive insurance cover",
            f10: "Cancel up to 48hrs before your move",
            f11: "660 Cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Shrink Wrapping services",
            f7: "Free packing service",
            f8: "Free mattress cover",
            f9: "Moving Concierge",
            f10: "Comprehensive insurance cover",
            f11: "Cancel up to 48hrs before your move",
            f12: "840 Cubic ft loading capacity",
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
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Standard insurance cover",
            f7: "Cancel up to 1 week before your move",
            f8: "450 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Help Help Load / unload",
            f7: "Shrink Wrapping services",
            f8: "Standard insurance cover",
            f9: "Cancel up to 1 week before your move",
            f10: "550 Cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Shrink Wrapping services",
            f7: "Moving Concierge",
            f8: "Comprehensive insurance cover",
            f9: "Cancel up to 48hrs before your move",
            f10: "660 Cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Shrink Wrapping services",
            f7: "Free packing service",
            f8: "Free mattress cover",
            f9: "Moving Concierge",
            f10: "Comprehensive insurance cover",
            f11: "Cancel up to 48hrs before your move",
            f12: "840 Cubic ft loading capacity",
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
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Standard insurance cover",
            f7: "Cancel up to 1 week before your move",
            f8: "450 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Shrink Wrapping services",
            f7: "Standard insurance cover",
            f8: "Cancel up to 1 week before your move",
            f9: "550 Cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f6: "Shrink Wrapping services",
            f7: "Moving Concierge",
            f8: "Comprehensive insurance cover",
            f9: "Cancel up to 48hrs before your move",
            f10: "660 Cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free mileage",
            f2: "Minimum 3 hours hire",
            f3: "Item dismantling / assembling",
            f4: "Help Load / unload",
            f5: "Trolly, straps & Blanket",
            f7: "Shrink Wrapping services",
            f8: "Free packing service",
            f9: "Free mattress cover",
            f10: "Moving Concierge",
            f11: "Comprehensive insurance cover",
            f12: "Cancel up to 48hrs before your move",
            f13: "840 Cubic ft loading capacity",
          };
          break;

        default:
          break;
      }
      break;
    case "1 bed property":
      switch (title) {
        case "STANDARD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Standard insurance cover",
            f6: "Cancel up to 1 week before your move",
            f7: "600 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Cancel up to 72hrs before your move",
            f8: "Comprehensive insurance cover",
            f9: "600 cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f9: "Free mattress covers",
            f10: "Free ₤50 packing material",
            f11: "Moving Concierge",
            f12: "Cancel up to 48hrs before your move",
            f13: "Comprehensive insurance cover",
            f14: "600 cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free packing services",
            f8: "Free mattress covers",
            f9: "Free ₤75 packing material",
            f10: "Moving Concierge",
            f11: "Cancel up to 48hrs before your move",
            f12: "Comprehensive insurance cover",
            f13: "600 cubic ft loading capacity",
          };
          break;

        default:
          break;
      }
      break;
    case "2 bed property":
      switch (title) {
        case "STANDARD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Standard insurance cover",
            f6: "Cancel up to 1 week before your move",
            f7: "600 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Cancel up to 72hrs before your move",
            f8: "Comprehensive insurance cover",
            f9: "600 cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free mattress covers",
            f8: "Free ₤75 packing material",
            f9: "Moving Concierge",
            f10: "Cancel up to 48hrs before your move",
            f11: "Comprehensive insurance cover",
            f12: "600 cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free packing services",
            f8: "Free mattress covers",
            f9: "Free ₤85 packing material",
            f10: "Moving Concierge",
            f11: "Cancel up to 48hrs before your move",
            f12: "Comprehensive insurance cover",
            f13: "700 cubic ft loading capacity",
          };
          break;

        default:
          break;
      }
      break;
    case "3 bed property":
      switch (title) {
        case "STANDARD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f6: "Standard insurance cover",
            f7: "Cancel up to 1 week before your move",
            f8: "520 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Cancel up to 72hrs before your move",
            f8: "Standard insurance cover",
            f9: "530 cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free mattress covers",
            f8: "Free ₤75 packing material",
            f9: "Moving Concierge",
            f10: "Cancel up to 48hrs before your move",
            f11: "Comprehensive insurance cover",
            f12: "600 cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free packing services",
            f8: "Free mattress covers",
            f9: "Free ₤85 packing material",
            f10: "Moving Concierge",
            f11: "Cancel up to 48hrs before your move",
            f12: "Comprehensive insurance cover",
            f13: "600 cubic ft loading capacity",
          };
          break;

        default:
          break;
      }
      break;
    case "4 bed property":
      switch (title) {
        case "STANDARD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Standard insurance cover",
            f6: "Cancel up to 1 week before your move",
            f7: "560 cubic ft loading capacity",
          };
          break;
        case "GOLD":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Cancel up to 72hrs before your move",
            f8: "Standard insurance cover",
            f9: "570 cubic ft loading capacity",
          };
          break;
        case "PREMIUM":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free mattress covers",
            f8: "Free ₤75 packing material",
            f9: "Moving Concierge",
            f10: "Cancel up to 48hrs before your move",
            f11: "Comprehensive insurance cover",
            f12: "760 cubic ft loading capacity",
          };
          break;
        case "PREMIUM PLUS":
          return {
            f1: "Free local mileage",
            f2: "Free loading / unloading",
            f3: "Free waiting time for keys",
            f4: "Trolly, straps & blankets",
            f5: "Item dismantling / assembling",
            f6: "Shrink Wrapping services",
            f7: "Free packing services",
            f8: "Free mattress covers",
            f9: "Free ₤85 packing material",
            f10: "Moving Concierge",
            f11: "Cancel up to 48hrs before your move",
            f12: "Comprehensive insurance cover",
            f13: "880 cubic ft loading capacity",
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

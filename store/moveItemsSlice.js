import { getCurrentDateFormatted } from "@/utils/logics";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moveItems: {
    bedRoom: [
      {
        name: "Chest Of Drawers",
        qty: 0,
        date: "",
      },
      {
        name: "Bedside Table",
        qty: 0,
        date: "",
      },
      {
        name: "Double Bed & Mattress",
        qty: 0,
        date: "",
      },
      {
        name: "Kingsize Bed & Mattress",
        qty: 0,
        date: "",
      },
      {
        name: "Single Bed & Mattress",
        qty: 0,
        date: "",
      },
      {
        name: "Cot",
        qty: 0,
        date: "",
      },
      {
        name: "Bookcase",
        qty: 0,
        date: "",
      },
      {
        name: "Double Wardrobe",
        qty: 0,
        date: "",
      },
      {
        name: "Chair",
        qty: 0,
        date: "",
      },
    ],
    living: [
      {
        name: "Television",
        qty: 0,
        date: "",
      },
      {
        name: "TV Stand",
        qty: 0,
        date: "",
      },
      {
        name: "Three Seater Sofa",
        qty: 0,
        date: "",
      },
      {
        name: "Two Seater Sofa",
        qty: 0,
        date: "",
      },
      {
        name: "Armchair",
        qty: 0,
        date: "",
      },
      {
        name: "Coffee Table",
        qty: 0,
      },
      {
        name: "Side Table",
        qty: 0,
        date: "",
      },
      {
        name: "Nest Of Tables",
        qty: 0,
        date: "",
      },
      {
        name: "Bookcase",
        qty: 0,
        date: "",
      },
      {
        name: "Floor Lamp",
        qty: 0,
        date: "",
      },
    ],
    dining: [
      {
        name: "Dining Chair",
        qty: 0,
        date: "",
      },
      {
        name: "4 Seater Dining Table",
        qty: 0,
        date: "",
      },
      {
        name: "6 Seater Dining Table",
        qty: 0,
        date: "",
      },
      {
        name: "8 Seater Dining Table",
        qty: 0,
        date: "",
      },
      {
        name: "Small Table",
        qty: 0,
        date: "",
      },
      {
        name: "Sideboard",
        qty: 0,
        date: "",
      },
      {
        name: "Bench",
        qty: 0,
        date: "",
      },
      {
        name: "Display Cabinet",
        qty: 0,
        date: "",
      },
      {
        name: "Rug",
        qty: 0,
        date: "",
      },
      {
        name: "Large Mirror",
        qty: 0,
        date: "",
      },
    ],
    kitchen: [
      {
        name: "Washing Machine",
        qty: 0,
        date: "",
      },
      {
        name: "Tumble Dryer",
        qty: 0,
        date: "",
      },
      {
        name: "Microwave Oven",
        qty: 0,
        date: "",
      },
      {
        name: "Fridge Freezer",
        qty: 0,
        date: "",
      },
      {
        name: "Chest Freezer",
        qty: 0,
        date: "",
      },
      {
        name: "Under Counter Fridge",
        qty: 0,
        date: "",
      },
      {
        name: "Kitchen Table",
        qty: 0,
        date: "",
      },
      {
        name: "Dining Chair",
        qty: 0,
        date: "",
      },
      {
        name: "Bin",
        qty: 0,
        date: "",
      },
      {
        name: "Ironing Board",
        qty: 0,
        date: "",
      },
    ],
    office: [
      {
        name: "Desk",
        qty: 0,
        date: "",
      },
      {
        name: "Office Chair",
        qty: 0,
        date: "",
      },
      {
        name: "Printer",
        qty: 0,
        date: "",
      },
      {
        name: "Bookcase",
        qty: 0,
        date: "",
      },
      {
        name: "Filing Cabinet",
        qty: 0,
        date: "",
      },
      {
        name: "Display Cabinet",
        qty: 0,
        date: "",
      },
      {
        name: "Lamp",
        qty: 0,
        date: "",
      },
      {
        name: "Computer",
        qty: 0,
        date: "",
      },
      {
        name: "Monitor",
        qty: 0,
        date: "",
      },
      {
        name: "Storage Unit",
        qty: 0,
        date: "",
      },
    ],
    bathRoom: [
      {
        name: "Bathroom Cabinet",
        qty: 0,
        date: "",
      },
      {
        name: "Large Mirror",
        qty: 0,
        date: "",
      },
      {
        name: "Small Mirror",
        qty: 0,
        date: "",
      },
      {
        name: "Basket",
        qty: 0,
        date: "",
      },
      {
        name: "Shelf",
        qty: 0,
        date: "",
      },
      {
        name: "Storage Unit",
        qty: 0,
        date: "",
      },
      {
        name: "Towel Rail",
        qty: 0,
        date: "",
      },
      {
        name: "Clothes Horse",
        qty: 0,
        date: "",
      },
      {
        name: "Bin",
        qty: 0,
        date: "",
      },
      {
        name: "Rug",
        qty: 0,
        date: "",
      },
    ],
    garden: [
      {
        name: "Garden Chair",
        qty: 0,
        date: "",
      },
      {
        name: "Garden Table",
        qty: 0,
        date: "",
      },
      {
        name: "Bicycle",
        qty: 0,
        date: "",
      },
      {
        name: "Lawn Mower",
        qty: 0,
        date: "",
      },
      {
        name: "Bbq",
        qty: 0,
        date: "",
      },
      {
        name: "Tool Box",
        qty: 0,
        date: "",
      },
      {
        name: "Small Potted Plant",
        qty: 0,
        date: "",
      },
      {
        name: "Large Potted Plant",
        qty: 0,
        date: "",
      },
      {
        name: "Plant Pot",
        qty: 0,
        date: "",
      },
      {
        name: "Ladder",
        qty: 0,
        date: "",
      },
    ],
  },
};

export const moveItemsSlice = createSlice({
  name: "moveItems",
  initialState,
  reducers: {
    resetMoveItems: (state, action) => {
      state.moveItems = action.payload;
    },

    resetMoveItems2: (state, action) => {
      state.moveItems = state.moveItems;
    },

    // BEDROOM
    updateQtyInBedroom: (state, action) => {
      const { itemName, newQty } = action.payload;
      const bedRoomItems = state?.moveItems?.bedRoom;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = bedRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        bedRoomItems[itemIndex].qty = newQty;
      }
    },
    increaseQtyInBedroom: (state, action) => {
      const { itemName } = action.payload;
      const bedRoomItems = state?.moveItems?.bedRoom;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = bedRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        bedRoomItems[itemIndex].qty += 1;
        bedRoomItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInBedroom: (state, action) => {
      const { itemName } = action.payload;
      const bedRoomItems = state?.moveItems?.bedRoom;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = bedRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found
        if (bedRoomItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          bedRoomItems[itemIndex].qty -= 1;
          bedRoomItems[itemIndex].date = getCurrentDateFormatted();
        } else if (bedRoomItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          bedRoomItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToBedroom: (state, action) => {
      const newItem = action.payload;
      state?.moveItems?.bedRoom.push(newItem);
    },
    updateDateInBedroom: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const bedRoomItems = state?.moveItems?.bedRoom;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = bedRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        bedRoomItems[itemIndex].date = newDate;
      }
    },
    // LIVING
    increaseQtyInLiving: (state, action) => {
      const { itemName } = action.payload;
      const livingItems = state?.moveItems?.living;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = livingItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        livingItems[itemIndex].qty += 1;
        livingItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInLiving: (state, action) => {
      const { itemName } = action.payload;
      const livingItems = state?.moveItems?.living;

      // Find the index of the item with the given name in the living array
      const itemIndex = livingItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found
        if (livingItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          livingItems[itemIndex].qty -= 1;
          livingItems[itemIndex].date = getCurrentDateFormatted();
        } else if (livingItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          livingItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToLiving: (state, action) => {
      const newItem = action.payload;
      state.moveItems?.living.push(newItem);
    },
    updateDateInLiving: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const livingItems = state?.moveItems?.living;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = livingItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        livingItems[itemIndex].date = newDate;
      }
    },

    // DINING
    increaseQtyInDining: (state, action) => {
      const { itemName } = action.payload;
      const diningItems = state.moveItems?.dining;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = diningItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        diningItems[itemIndex].qty += 1;
        diningItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInDining: (state, action) => {
      const { itemName } = action.payload;
      const diningItems = state.moveItems?.dining;

      // Find the index of the item with the given name in the living array
      const itemIndex = diningItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found
        if (diningItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          diningItems[itemIndex].qty -= 1;
          diningItems[itemIndex].date = getCurrentDateFormatted();
        } else if (diningItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          diningItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToDining: (state, action) => {
      const newItem = action.payload;
      state.moveItems?.dining.push(newItem);
    },
    updateDateInDining: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const diningItems = state?.moveItems?.dining;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = diningItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        diningItems[itemIndex].date = newDate;
      }
    },

    // KITCHEN
    increaseQtyInKitchen: (state, action) => {
      const { itemName } = action.payload;
      const kitchenItems = state.moveItems?.kitchen;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = kitchenItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        kitchenItems[itemIndex].qty += 1;
        kitchenItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInKitchen: (state, action) => {
      const { itemName } = action.payload;
      const kitchenItems = state.moveItems?.kitchen;

      // Find the index of the item with the given name in the living array
      const itemIndex = kitchenItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found
        if (kitchenItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          kitchenItems[itemIndex].qty -= 1;
          kitchenItems[itemIndex].date = getCurrentDateFormatted();
        } else if (kitchenItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          kitchenItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToKitchen: (state, action) => {
      const newItem = action.payload;
      state.moveItems?.kitchen.push(newItem);
    },
    updateDateInKitchen: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const kitchenItems = state?.moveItems?.kitchen;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = kitchenItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        kitchenItems[itemIndex].date = newDate;
      }
    },

    // OFFICE
    increaseQtyInOffice: (state, action) => {
      const { itemName } = action.payload;
      const officeItems = state.moveItems?.office;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = officeItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        officeItems[itemIndex].qty += 1;
        officeItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInOffice: (state, action) => {
      const { itemName } = action.payload;
      const officeItems = state.moveItems?.office;

      // Find the index of the item with the given name in the living array
      const itemIndex = officeItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found
        if (officeItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          officeItems[itemIndex].qty -= 1;
          officeItems[itemIndex].date = getCurrentDateFormatted();
        } else if (officeItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          officeItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToOffice: (state, action) => {
      const newItem = action.payload;
      state.moveItems?.office.push(newItem);
    },
    updateDateInOffice: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const officeItems = state?.moveItems?.office;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = officeItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        officeItems[itemIndex].date = newDate;
      }
    },

    // BATHROOM
    increaseQtyInBathRoom: (state, action) => {
      const { itemName } = action.payload;
      const bathRoomItems = state.moveItems?.bathRoom;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = bathRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        bathRoomItems[itemIndex].qty += 1;
        bathRoomItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInBathRoom: (state, action) => {
      const { itemName } = action.payload;
      const bathRoomItems = state.moveItems?.bathRoom;

      // Find the index of the item with the given name in the living array
      const itemIndex = bathRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found
        if (bathRoomItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          bathRoomItems[itemIndex].qty -= 1;
          bathRoomItems[itemIndex].date = getCurrentDateFormatted();
        } else if (bathRoomItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          bathRoomItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToBathRoom: (state, action) => {
      const newItem = action.payload;
      state.moveItems?.bathRoom.push(newItem);
    },
    updateDateInBathroom: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const bathRoomItems = state?.moveItems?.bathRoom;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = bathRoomItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        bathRoomItems[itemIndex].date = newDate;
      }
    },

    // GARDEN
    increaseQtyInGarden: (state, action) => {
      const { itemName } = action.payload;
      const gardenItems = state.moveItems?.garden;

      // Find the index of the item with the given name in the garden array
      const itemIndex = gardenItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        gardenItems[itemIndex].qty += 1;
        gardenItems[itemIndex].date = getCurrentDateFormatted();
      }
    },
    decreaseQtyInGarden: (state, action) => {
      const { itemName } = action.payload;
      const gardenItems = state.moveItems?.garden;

      // Find the index of the item with the given name in the living array
      const itemIndex = gardenItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found
        if (gardenItems[itemIndex].qty > 0) {
          // Reduce its qty by 1 if qty is greater than 0
          gardenItems[itemIndex].qty -= 1;
          gardenItems[itemIndex].date = getCurrentDateFormatted();
        } else if (gardenItems[itemIndex].qty === 0) {
          // Remove the item from the array if qty is 0
          gardenItems.splice(itemIndex, 1);
        }
      }
    },
    addNewItemToGarden: (state, action) => {
      const newItem = action.payload;
      state.moveItems?.garden.push(newItem);
    },
    updateDateInGarden: (state, action) => {
      const { itemName, newQty, newDate } = action.payload;
      const gardenItems = state?.moveItems?.garden;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = gardenItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, update its qty
        gardenItems[itemIndex].date = newDate;
      }
    },
  },
});

export const {
  resetMoveItems,
  resetMoveItems2,

  // BEDROOM
  updateQtyInBedroom,
  increaseQtyInBedroom,
  decreaseQtyInBedroom,
  addNewItemToBedroom,
  updateDateInBedroom,

  // LIVING
  increaseQtyInLiving,
  decreaseQtyInLiving,
  addNewItemToLiving,
  updateDateInLiving,

  // DINING
  increaseQtyInDining,
  decreaseQtyInDining,
  addNewItemToDining,
  updateDateInDining,

  // KITCHEN
  increaseQtyInKitchen,
  decreaseQtyInKitchen,
  addNewItemToKitchen,
  updateDateInKitchen,

  // OFFICE
  increaseQtyInOffice,
  decreaseQtyInOffice,
  addNewItemToOffice,
  updateDateInOffice,

  // BATHROOM
  increaseQtyInBathRoom,
  decreaseQtyInBathRoom,
  addNewItemToBathRoom,
  updateDateInBathroom,

  // GARDEN
  increaseQtyInGarden,
  decreaseQtyInGarden,
  addNewItemToGarden,
  updateDateInGarden,
} = moveItemsSlice.actions;

export const getAllMoveItems = (state) => state.moveItems;

// export const LocationDetails = (state) => state.quote.serviceLocation;

// export const getLatestQuote = (state) =>
//   state.quote.quoteDetails[state.quote.quoteDetails.length - 1];

export default moveItemsSlice.reducer;

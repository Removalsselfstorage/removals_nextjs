import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  moveItems: {
    bedRoom: [
      {
        name: "Chest Of Drawers",
        qty: 0,
      },
      {
        name: "Bedside Table",
        qty: 0,
      },
      {
        name: "Double Bed & Mattress",
        qty: 0,
      },
      {
        name: "Kingsize Bed & Mattress",
        qty: 0,
      },
      {
        name: "Single Bed & Mattress",
        qty: 0,
      },
      {
        name: "Cot",
        qty: 0,
      },
      {
        name: "Bookcase",
        qty: 0,
      },
      {
        name: "Double Wardrobe",
        qty: 0,
      },
      {
        name: "Chair",
        qty: 0,
      },
    ],
    living: [
      {
        name: "Television",
        qty: 0,
      },
      {
        name: "TV Stand",
        qty: 0,
      },
      {
        name: "Three Seater Sofa",
        qty: 0,
      },
      {
        name: "Two Seater Sofa",
        qty: 0,
      },
      {
        name: "Armchair",
        qty: 0,
      },
      {
        name: "Coffee Table",
        qty: 0,
      },
      {
        name: "Side Table",
        qty: 0,
      },
      {
        name: "Nest Of Tables",
        qty: 0,
      },
      {
        name: "Bookcase",
        qty: 0,
      },
      {
        name: "Floor Lamp",
        qty: 0,
      },
    ],
    dining: [
      {
        name: "Dining Chair",
        qty: 0,
      },
      {
        name: "4 Seater Dining Table",
        qty: 0,
      },
      {
        name: "6 Seater Dining Table",
        qty: 0,
      },
      {
        name: "8 Seater Dining Table",
        qty: 0,
      },
      {
        name: "Small Table",
        qty: 0,
      },
      {
        name: "Sideboard",
        qty: 0,
      },
      {
        name: "Bench",
        qty: 0,
      },
      {
        name: "Display Cabinet",
        qty: 0,
      },
      {
        name: "Rug",
        qty: 0,
      },
      {
        name: "Large Mirror",
        qty: 0,
      },
    ],
    kitchen: [
      {
        name: "Washing Machine",
        qty: 0,
      },
      {
        name: "Tumble Dryer",
        qty: 0,
      },
      {
        name: "Microwave Oven",
        qty: 0,
      },
      {
        name: "Fridge Freezer",
        qty: 0,
      },
      {
        name: "Chest Freezer",
        qty: 0,
      },
      {
        name: "Under Counter Fridge",
        qty: 0,
      },
      {
        name: "Kitchen Table",
        qty: 0,
      },
      {
        name: "Dining Chair",
        qty: 0,
      },
      {
        name: "Bin",
        qty: 0,
      },
      {
        name: "Ironing Board",
        qty: 0,
      },
    ],
    office: [
      {
        name: "Desk",
        qty: 0,
      },
      {
        name: "Office Chair",
        qty: 0,
      },
      {
        name: "Printer",
        qty: 0,
      },
      {
        name: "Bookcase",
        qty: 0,
      },
      {
        name: "Filing Cabinet",
        qty: 0,
      },
      {
        name: "Display Cabinet",
        qty: 0,
      },
      {
        name: "Lamp",
        qty: 0,
      },
      {
        name: "Computer",
        qty: 0,
      },
      {
        name: "Monitor",
        qty: 0,
      },
      {
        name: "Storage Unit",
        qty: 0,
      },
    ],
    bathRoom: [
      {
        name: "Bathroom Cabinet",
        qty: 0,
      },
      {
        name: "Large Mirror",
        qty: 0,
      },
      {
        name: "Small Mirror",
        qty: 0,
      },
      {
        name: "Basket",
        qty: 0,
      },
      {
        name: "Shelf",
        qty: 0,
      },
      {
        name: "Storage Unit",
        qty: 0,
      },
      {
        name: "Towel Rail",
        qty: 0,
      },
      {
        name: "Clothes Horse",
        qty: 0,
      },
      {
        name: "Bin",
        qty: 0,
      },
      {
        name: "Rug",
        qty: 0,
      },
    ],
    garden: [
      {
        name: "Garden Chair",
        qty: 0,
      },
      {
        name: "Garden Table",
        qty: 0,
      },
      {
        name: "Bicycle",
        qty: 0,
      },
      {
        name: "Lawn Mower",
        qty: 0,
      },
      {
        name: "Bbq",
        qty: 0,
      },
      {
        name: "Tool Box",
        qty: 0,
      },
      {
        name: "Small Potted Plant",
        qty: 0,
      },
      {
        name: "Large Potted Plant",
        qty: 0,
      },
      {
        name: "Plant Pot",
        qty: 0,
      },
      {
        name: "Ladder",
        qty: 0,
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
    // LIVING
    increaseQtyInLiving: (state, action) => {
      const { itemName } = action.payload;
      const livingItems = state?.moveItems?.living;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = livingItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        livingItems[itemIndex].qty += 1;
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

    // DINING
    increaseQtyInDining: (state, action) => {
      const { itemName } = action.payload;
      const diningItems = state.moveItems?.dining;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = diningItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        diningItems[itemIndex].qty += 1;
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

    // OFFICE
    increaseQtyInOffice: (state, action) => {
      const { itemName } = action.payload;
      const officeItems = state.moveItems?.office;

      // Find the index of the item with the given name in the bedRoom array
      const itemIndex = officeItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        officeItems[itemIndex].qty += 1;
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

    // GARDEN
    increaseQtyInGarden: (state, action) => {
      const { itemName } = action.payload;
      const gardenItems = state.moveItems?.garden;

      // Find the index of the item with the given name in the garden array
      const itemIndex = gardenItems.findIndex((item) => item.name === itemName);

      if (itemIndex !== -1) {
        // If the item is found, increase its qty by 1
        gardenItems[itemIndex].qty += 1;
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
  },
});

export const {
  resetMoveItems,

  // BEDROOM
  updateQtyInBedroom,
  increaseQtyInBedroom,
  decreaseQtyInBedroom,
  addNewItemToBedroom,
  // LIVING
  increaseQtyInLiving,
  decreaseQtyInLiving,
  addNewItemToLiving,
  // DINING
  increaseQtyInDining,
  decreaseQtyInDining,
  addNewItemToDining,
  // KITCHEN
  increaseQtyInKitchen,
  decreaseQtyInKitchen,
  addNewItemToKitchen,
  // OFFICE
  increaseQtyInOffice,
  decreaseQtyInOffice,
  addNewItemToOffice,
  // BATHROOM
  increaseQtyInBathRoom,
  decreaseQtyInBathRoom,
  addNewItemToBathRoom,
  // GARDEN
  increaseQtyInGarden,
  decreaseQtyInGarden,
  addNewItemToGarden,
} = moveItemsSlice.actions;

export const getAllMoveItems = (state) => state.moveItems;

// export const LocationDetails = (state) => state.quote.serviceLocation;

// export const getLatestQuote = (state) =>
//   state.quote.quoteDetails[state.quote.quoteDetails.length - 1];

export default moveItemsSlice.reducer;

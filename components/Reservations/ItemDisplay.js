import {
  checkBookStatus,
  convertDateFormat,
  convertTimeTo24HourFormat,
  formatDate,
  formatMovePrice,
  getCurrentDateFormatted,
  hasQtyGreaterThanOne,
  dateStringToInteger,
  sortItems,
  checkZeroQty,
  compareDate,
} from "@/utils/logics";

const ItemDisplay = ({ sortedItems, showDate }) => {
  // console.log({ sortedItems, epDate });
  return (
    <>
      {sortedItems?.map((mi, index) => {
        // const checKDate = compareDate(epDate, mi.date) || false;
        return (
          <div className={`flex space-x-[10px]`} key={index}>
            {mi.qty > 0 && (
              <p>
                {mi.qty} x {mi.name}
              </p>
            )}
            {showDate && mi.qty > 0 && (
              // <p
              //   className={`${
              //     checKDate ? "text-secondary" : "text-gray-500"
              //   } text-[13px]`}
              // >
              <p className="text-[13px] mb-[0px] text-gray-500"> - {mi.date}</p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default ItemDisplay;

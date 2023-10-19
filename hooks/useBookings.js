import { useQuery } from "@tanstack/react-query";
import { fetchAllBookings } from "@/lib/fetchData2";
import queryKeys from "@/utils/queryKeys";
import { useState } from "react";
import useQuote from "./useQuote";

const useBookings = () => {
  const {
    setReserveDetailsFxn,
    reserveDetails,
    router,
    reserveId,
    updateReserveIdFxn,
  } = useQuote();

  const {
    data: completedBook,
    isLoading: completedBookLoading,
    refetch: refetchCompletedBook,
  } = useQuery({
    queryKey: [queryKeys.GET_BOOKING_DATA],
    queryFn: fetchAllBookings,
    select: (data) => {
      const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

      const filteredBook = cs?.find((obj) => obj.id === reserveId);

      console.log({ data, cs });
      return filteredBook;
    },
    // onError(err) {
    //   errorHandler(err);
    // },
  });

  // const completedBook = (id) => {
  //   const filteredBook = completedBookings?.find((obj) => obj.id === id);
  //   console.log({ filteredBook });
  //   return filteredBook;
  // };

  console.log({ reserveId, completedBook });

  return {
    completedBook,
    completedBookLoading,
    refetchCompletedBook,
  };
};

export default useBookings;

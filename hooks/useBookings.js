import { useQuery } from "@tanstack/react-query";
import { fetchAllBookings } from "@/lib/fetchData2";
import queryKeys from "@/utils/queryKeys";
import { useState } from "react";
import useQuote from "./useQuote";

const useBookings = () => {
  // const {
  //   setReserveDetailsFxn,
  //   reserveDetails,
  //   router,
  //   reserveId,
  //   updateReserveIdFxn,
  // } = useQuote();

  // const {
  //   data: completedBook,
  //   isLoading: completedBookLoading,
  //   refetch: refetchCompletedBook,
  // } = useQuery({
  //   queryKey: [queryKeys.GET_BOOKING_DATA],
  //   queryFn: fetchAllBookings,
  //   select: (data) => {
  //     const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

  //     const filteredBook = cs?.find((obj) => obj.id === reserveId);

  //     // console.log({ data, cs, reserveId, filteredBook });
  //     return filteredBook;
  //   },
  //   // onError(err) {
  //   //   errorHandler(err);
  //   // },
  // });

  // const {
  //   data: allBookings,
  //   isLoading: allBookingsLoading,
  //   refetch: refetchAllBookings,
  // } = useQuery({
  //   queryKey: [queryKeys.GET_BOOKING_DATA],
  //   queryFn: fetchAllBookings,
  //   select: (data) => {
  //     // const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

  //     // console.log({ data, completedBookings });
  //     return data?.bookings;
  //   },
  //   // onError(err) {
  //   //   errorHandler(err);
  //   // },
  // });

  const {
    data: allBookings,
    isLoading: bookingsLoading,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: [queryKeys.GET_BOOKING_DATA],
    queryFn: fetchAllBookings,
    // refetchInterval: 5000,
    select: (data) => {
      // console.log("Allbookings mounted");
      // const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

      // console.log({ data, completedBookings });
      const allBooks = [...data?.bookings].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      return allBooks;
    },
  });

  const {
    data: completedBookings,
    isLoading: completedBookingsLoading,
    refetch: refetchCompletedBookings,
  } = useQuery({
    queryKey: [queryKeys.GET_COMPLETED_BOOKING],
    queryFn: fetchAllBookings,
    select: (data) => {
      // console.log("completedBookings mounted");
      // const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

      // console.log({ data, completedBookings });
      const allBooks = [...data?.bookings].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      const filtered = allBooks?.filter((bk) => bk.completedBook === true);

      return filtered;
    },
  });

  const completedBook = (id) => {
    // const bb = allBookings?.filter((bk) => bk.completedBook === true);
    const filteredBook = completedBookings?.find((obj) => obj.id === id);

    return filteredBook;
  };

  const allBook = (id) => {
    const filteredBook = allBookings?.find((obj) => obj.id === id);
    // console.log({ filteredBook });
    return filteredBook;
  };

  // console.log({ reserveId, completedBook });

  return {
    allBookings,
    bookingsLoading,
    refetchBookings,

    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,

    completedBook,
    allBook,
  };
};

export default useBookings;

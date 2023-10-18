import { useQuery } from "@tanstack/react-query";
import { fetchAllBookings } from "@/lib/fetchData2";
import queryKeys from "@/utils/queryKeys";

const useBookings = () => {
  const {
    data: completedBookings,
    isLoading: completedBookingsLoading,
    refetch: refetchCompletedBookings,
  } = useQuery({
    queryKey: [queryKeys.GET_BOOKING_DATA],
    queryFn: fetchAllBookings,
    select: (data) => {
      const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

      // console.log({ data, completedBookings });
      return cs;
    },
    // onError(err) {
    //   errorHandler(err);
    // },
  });

  const completedBook = (id) => {
    const filteredBook = completedBookings?.find((obj) => obj.id === id);
    console.log({ filteredBook });
    return filteredBook;
  };

  console.log({ completedBookings });

  return {
    completedBookings,
    completedBookingsLoading,
    refetchCompletedBookings,
    completedBook,
  };
};

export default useBookings;

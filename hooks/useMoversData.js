import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllBookings,
  fetchAllBookings2,
  fetchAllMoversDetailsArray,
} from "@/lib/fetchData2";
import queryKeys from "@/utils/queryKeys";

const useMoversData = () => {
  const {
    data: allMoversData,
    isLoading: allMoversDataLoading,
    refetch: refetchAllMoversData,
  } = useQuery({
    queryKey: [queryKeys.GET_MOVERS_DATA],
    queryFn: fetchAllMoversDetailsArray,
    // refetchInterval: 5000,
    select: (data) => {
      // console.log({ data });
      // console.log("Allbookings mounted");
      // const cs = data?.bookings?.filter((bk) => bk.completedBook === true);

      // console.log({ data, completedBookings });
      //   const allData = [...data?.bookings].sort((a, b) => {
      //     return new Date(b.date) - new Date(a.date);
      //   });

      return {
        allPersonalDetails: data?.personalDetails,
        allCompanyDetails: data?.companyDetails,
        allCompanyPix: data?.CompanyPix,
        allCompanyDocs: {
          regCertificates: data?.RegCertificate,
          vehInsurances: data?.VehInsurance,
          pubInsurances: data?.PubInsurance,
          tranInsurances: data?.TranInsurance,
          drivingLicenses: data?.DrivingLicense,
        },
        allPortfolioPix: {
          portfolioPix1: data?.Portfolio1,
          portfolioPix2: data?.Portfolio2,
          portfolioPix3: data?.Portfolio3,
          portfolioPix4: data?.Portfolio4,
          portfolioPix5: data?.Portfolio5,
          portfolioPix6: data?.Portfolio6,
        },
      };
    },
  });

  return {
    allMoversData,
    allMoversDataLoading,
    refetchAllMoversData,
  };
};

export default useMoversData;

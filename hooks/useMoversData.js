import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllBookings,
  fetchAllBookings2,
  fetchAllMoversDetails,
  fetchAllMoversDetailsArray,
} from "@/lib/fetchData2";
import queryKeys from "@/utils/queryKeys";
import { db, storage } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import useMover from "./useMover";
import { getAllUserDetails } from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const useMoversData = () => {
  const router = useRouter();
  // const { justRegistered, personalMoverDetails, companyDetails } = useMover();

  // const uid = personalMoverDetails?.uid;
  const userDetails = useSelector(getAllUserDetails);

  const uid = userDetails.userDetails?.uid;

  // console.log({ uid });

  const getSingleMoverData = async () => {
    const moverRef = doc(db, "moversData", uid);
    const docSnap = await getDoc(moverRef);
    // const moverDat = docSnap.data()?.notifications;
    const moverData2 = docSnap.data();
    return moverData2;
  };

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

  // const fetchAllMoversDetails2 = await fetchAllMoversDetails(uid)
  const fetchMove = async () => {
    const userData = await fetchAllMoversDetails(uid);
    return userData;
  };

  const {
    data: singleMoversData,
    isLoading: singleMoversDataLoading,
    refetch: refetchSingleMoversData,
  } = useQuery({
    queryKey: [queryKeys.GET_MOVER_DATA],
    queryFn: fetchMove,
    // refetchInterval: 5000,
    select: (data) => {
      // console.log({ sdata: data, uid });

      return {
        CompanyPix: data?.CompanyPix,
        DrivingLicense: data?.DrivingLicense,
        PubInsurance: data?.PubInsurance,
        RegCertificate: data?.RegCertificate,
        TranInsurance: data?.TranInsurance,
        VehInsurance: data?.VehInsurance,
        companyDetails: data?.companyDetails,
        personalDetails: data?.personalDetails,
        portfolioPix1: data?.portFolio1,
        portfolioPix2: data?.portFolio2,
        portfolioPix3: data?.portFolio3,
        portfolioPix4: data?.portFolio4,
        portfolioPix5: data?.portFolio5,
        portfolioPix6: data?.portFolio6,
      };
    },
  });

  // console.log({ singleMoversData });

  return {
    allMoversData,
    allMoversDataLoading,
    refetchAllMoversData,
    singleMoversData,
    singleMoversDataLoading,
    refetchSingleMoversData,
    // portFolioPix: filterPortfolio(),
    uid,
    router,
  };
};

export default useMoversData;

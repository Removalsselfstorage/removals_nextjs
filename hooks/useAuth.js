import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  sendEmailVerification,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUserDetails,
  updateLoginError,
  updateSignupError,
  updateUserDetails,
  updateLogoutError,
  updateUserNames,
  updateSignupMessage,
  updatePasswordResetMessage,
  updatePasswordResetError,
  updateVerificationMessage,
} from "@/store/userSlice";
// import { sendEmail } from "@/utils/sendEmails";
import { activateEmailTemplate } from "@/emails/activateEmailTemplate";
import {
  getAllMoverDetails,
  updateCompanyDetails,
  updateCompanyDocs,
  updateJustRegistered,
  updateMoverPersonalDetails,
  updatePersonalDetails,
} from "@/store/moverSlice";
import { fetchAllMoversDetails } from "@/lib/fetchData2";
import {
  UploadMoverData,
  UploadMoverPersonalDetails2,
} from "@/lib/uploadMoverPersonalDetails2";
import { UploadMoverDocumentation } from "@/lib/uploadMoverDocumentation";
import { UploadMoverPersonalDetails3 } from "@/lib/uploadMoverPersonalDetails3";
import { UploadMoverDocumentation2 } from "@/lib/uploadMoverDocumentation2";
import { doc, setDoc } from "firebase/firestore";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import useMover from "./useMover";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resendEmailVerification: async () => {},
  error: null,
  loading: false,
  // justRegistered: false,
});

export const AuthProvider = ({ children }) => {
  const {
    // justRegistered,
    personalMoverDetails,
    companyDetails,
    companyDocs,
    allMoverData,
    updateJustR,
    resetJustR,
    updatePersonalMover,
    resetPersonalMover,
    updateCompanyDe,
    resetCompanyDe,
    updateCompanyDo,
    resetCompanyDo,
    updateAllMoverD,
    resetAllMoverD,
    router,
  } = useMover();

  // const router = useRouter();

  // const details = useSelector(getAllMoverDetails);
  // const moverDetails = useSelector(getAllMoverDetails);

  const dispatch = useDispatch();

  const { userDetails } = useSelector(getAllUserDetails);

  // console.log(userDetails);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (userDetails) => {
        // if (userDetails) {

        if (userDetails?.emailVerified) {
          // Logged in...
          // setUser(user);

          dispatch(updateUserDetails(userDetails));
          // router.push("/");

          // setLoading(false);
        } else {
          // Not logged in...
          // setUser(null);

          dispatch(updateUserDetails(null));
          // window.location.reload();

          // dispatch(updateUserDetails(null));
          // setLoading(true);
          // router.push("/mover-login");
          // router.push("/");
        }
        // setError("");

        // setInitialLoading(false);
      }),
    [auth]
  );

  const emailConfirmation = async (usr) => {
    try {
      await sendEmailVerification(usr);
      updateVerificationMessage("Email verification link sent");
    } catch (error) {
      console.log(error);
    }
  };

  const signUp = async (email, password, firstName, lastName) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // setUser(userCredential.user);
      // dispatch(updateUserDetails(userCredential.user));

      // dispatch(updateUserDetails(userCredential.user));

      emailConfirmation(userCredential.user);

      // dispatch(
      //   updateMoverPersonalDetails({
      //     firstName: firstName,
      //     lastName: lastName,
      //     email: email,
      //     phone: details.personalDetails.phone,
      //     address: details.personalDetails.address,
      //     personalBio: details.personalDetails.personalBio,
      //     profilePicture: details.personalDetails.profilePicture,
      //   })
      // );

      updatePersonalMover({
        uid: userCredential.user.uid,
        firstName: firstName,
        lastName: lastName,
        email: email,
        registerDate: userCredential.user.metadata.creationTime,
        lastLogin: userCredential.user.metadata.lastSignInTime,
      });

      const moveObj = {
        profilePictureRaw: "",
        profilePictureUrl: "",
        profilePictureName: "",
        address: "",
        personalBio: "",
        firstName: firstName,
        lastName: lastName,
        generatedName: "",
        email: email,
        phone: "",
        registerDate: userCredential.user.metadata.creationTime,
        lastLogin: userCredential.user.metadata.lastSignInTime,
        reviewSubmit: false,
        acceptedTerms: false,
        justRegistered: true,
        uid: userCredential.user.uid,
      };
      const result = await UploadMoverPersonalDetails3(moveObj);

      const moveObj2 = {
        companyName: "",
        generatedName: "",
        companyNumber: "",
        companyAddress: "",
        companyBio: "",
        companyProfilePixRaw: "",
        companyProfilePixUrl: "",
        companyProfilePixName: "",
        regCertificateRaw: "",
        regCertificateUrl: "",
        regCertificateName: "",
        vehInsuranceRaw: "",
        vehInsuranceUrl: "",
        vehInsuranceName: "",
        pubInsuranceRaw: "",
        pubInsuranceUrl: "",
        pubInsuranceName: "",
        tranInsuranceRaw: "",
        tranInsuranceUrl: "",
        tranInsuranceName: "",
        drivingLicenseRaw: "",
        drivingLicenseUrl: "",
        drivingLicenseName: "",
        reviewSubmit: false,
        uid: userCredential.user.uid,
      };

      const result2 = await UploadMoverDocumentation2(moveObj2);
      // dispatch(updateJustRegistered(true));

      // toast(`Registration successful`, {
      //   duration: 8000,
      //   style: toastStyle1,
      // });
      // emailConfirmation(userCredential.user);

      // Delay the router push by 3 seconds

      // toast.success(
      //   `Registered successfully! Please activate your email to get started.`,
      //   {
      //     duration: 6000,
      //   }
      // );

      dispatch(
        updateSignupMessage(
          "Registered successfully! Please activate your email to get started"
        )
      );

      setTimeout(() => {
        // router.push("/onboarding/personal-details");
        router.push("/mover-login");
      }, 2000);

      setLoading(false);
    } catch (error) {
      // toast.error(`Email already in use.`, {
      //   duration: 6000,
      // });

      console.log("SignupError", error);
      setError(error.message);
      dispatch(updateSignupError(error.message));
      // toast(`Email already in use`, {
      //   duration: 8000,
      //   style: toastStyle2,
      // });
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = await fetchAllMoversDetails(userCredential.user.uid);

      updateJustR(userData?.personalDetails.justRegistered);
      updatePersonalMover({
        uid: userData?.personalDetails.uid,
        firstName: userData?.personalDetails.firstName,
        lastName: userData?.personalDetails.lastName,
        generatedName: userData?.personalDetails.generatedName,
        email: userData?.personalDetails.email,
        phone: userData?.personalDetails.phone,
        address: userData?.personalDetails.address,
        personalBio: userData?.personalDetails.personalBio,
        // profilePictureRaw: "",
        profilePictureUrl: userData?.personalDetails.profileImageUrl,
        profilePictureName: userData?.personalDetails.profilePictureName,
        registerDate: userCredential.user.metadata.creationTime,
        lastLogin: userCredential.user.metadata.lastSignInTime,
        reviewSubmit: userData?.personalDetails.reviewSubmit,
        acceptedTerms: userData?.personalDetails.acceptedTerms,
        approvalStatus: userData?.personalDetails.approvalStatus,
        rating: userData?.personalDetails.rating,
        ratingCount: userData?.personalDetails.ratingCount,
      });
      updateCompanyDe({
        companyName: userData.companyDetails.companyName,
        generatedName: userData.companyDetails.generatedName,
        companyNumber: userData.companyDetails.companyNumber,
        companyAddress: userData.companyDetails.companyAddress,
        companyBio: userData.companyDetails.companyBio,
        // companyProfilePixRaw: userData.CompanyPix.companyProfilePixPreviewUrl,
        // companyProfilePixRaw: "",
        companyProfilePixUrl: userData.CompanyPix.companyProfilePixUrl,
        companyProfilePixName: userData.CompanyPix.companyProfilePixName,
        reviewSubmit: userData?.companyDetails.reviewSubmit,
      });
      updateCompanyDo({
        regCertificateUrl: userData.RegCertificate.regCertificateUrl,
        regCertificateName: userData.RegCertificate.regCertificateName,
        vehInsuranceUrl: userData.VehInsurance.vehInsuranceUrl,
        vehInsuranceName: userData.VehInsurance.vehInsuranceName,
        pubInsuranceUrl: userData.PubInsurance.pubInsuranceUrl,
        pubInsuranceName: userData.PubInsurance.pubInsuranceName,
        tranInsuranceUrl: userData.TranInsurance.tranInsuranceUrl,
        tranInsuranceName: userData.TranInsurance.tranInsuranceName,
        drivingLicenseUrl: userData.DrivingLicense.drivingLicenseUrl,
        drivingLicenseName: userData.DrivingLicense.drivingLicenseName,
      });

      if (userCredential.user.emailVerified) {
        // setUser(userCredential.user);
        dispatch(updateUserDetails(userCredential.user));

        if (userData?.personalDetails.justRegistered === true) {
          router.push("/onboarding/personal-details");
        } else if (userData?.personalDetails.justRegistered === false) {
          // router.push(`/mover-profile/dashboard/${userCredential.user.uid}`);

          router.push(`/mover-profile/dashboard`);
        }
      } else {
        setUser(userCredential.user);

        // toast.error(`Please verify your email to login.`, {
        //   duration: 6000,
        // });

        dispatch(
          updateVerificationMessage(
            "Please verify your email via link sent to your mail, to login."
          )
        );
      }
    } catch (error) {
      // toast.error(`Email / password is invalid`, {
      //   duration: 6000,
      // });
      setError(error.message);
      dispatch(updateLoginError(error.message));
      setLoading(false);
    }
  };

  const resendEmailVerification = () => {
    emailConfirmation(user);
  };

  const logout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      router.push("/mover-login");
      setTimeout(() => {
        setUser(null);
        dispatch(updateUserDetails(null));
      }, 2000);
    } catch (error) {
      setError(error.message);
      dispatch(updateLoginError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(updatePasswordResetMessage("Password reset link has been sent"));
      // setUser(null);
      // dispatch(updateUserDetails(null));
      // router.push("/mover-login");
    } catch (error) {
      setError(error.message);
      dispatch(updatePasswordResetError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      error,
      loading,
      logout,
      forgotPassword,
      resendEmailVerification,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context compnent.
export default function useAuth() {
  return useContext(AuthContext);
}

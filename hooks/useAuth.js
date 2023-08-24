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
import { auth } from "@/firebase";
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
import { UploadMoverPersonalDetails2 } from "@/lib/uploadMoverPersonalDetails2";
import { UploadMoverDocumentation } from "@/lib/uploadMoverDocumentation";
import { UploadMoverPersonalDetails3 } from "@/lib/uploadMoverPersonalDetails3";
import { UploadMoverDocumentation2 } from "@/lib/uploadMoverDocumentation2";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resendEmailVerification: async () => {},
  error: null,
  loading: false,
  justRegistered: false,
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const details = useSelector(getAllMoverDetails);
  // const moverDetails = useSelector(getAllMoverDetails);

  const dispatch = useDispatch();

  const { userDetails } = useSelector(getAllUserDetails);

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
          setLoading(false);
        } else {
          // Not logged in...
          // setUser(null);
          dispatch(updateUserDetails(null));
          // dispatch(updateUserDetails(null));
          // setLoading(true);
          // router.push("/login");
        }
        // setError("");

        setInitialLoading(false);
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

      dispatch(
        updatePersonalDetails({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: "",
          address: "",
          personalBio: "",
          profilePicture: {
            raw: "",
            url: "",
            name: "",
          },
          registerDate: userCredential.user.metadata.creationTime,
          reviewSubmit: false,
          acceptedTerms: false,
        })
      );

      dispatch(
        updateCompanyDetails({
          companyName: "",
          generatedName: "",
          companyNumber: "",
          companyAddress: "",
          companyBio: "",
          companyProfilePix: {
            raw: "",
            url: "",
            name: "",
          },
          reviewSubmit: false,
        })
      );

      dispatch(
        updateCompanyDocs({
          regCertificate: {
            raw: "",
            url: "",
            name: "",
          },
          vehInsurance: {
            raw: "",
            url: "",
            name: "",
          },
          pubInsurance: {
            raw: "",
            url: "",
            name: "",
          },
          tranInsurance: {
            raw: "",
            url: "",
            name: "",
          },
          drivingLicense: {
            raw: "",
            url: "",
            name: "",
          },
          reviewSubmit: false,
        })
      );

      const moveObj = {
        profilePicture: {
          raw: "",
          url: "",
          name: "",
        },
        address: "",
        personalBio: "",
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: "",
        registerDate: userCredential.user.metadata.creationTime,
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
        companyProfilePix: {
          raw: "",
          url: "",
          name: "",
        },
        regCertificate: {
          raw: "",
          url: "",
          name: "",
        },
        vehInsurance: {
          raw: "",
          url: "",
          name: "",
        },
        pubInsurance: {
          raw: "",
          url: "",
          name: "",
        },
        tranInsurance: {
          raw: "",
          url: "",
          name: "",
        },
        drivingLicense: {
          raw: "",
          url: "",
          name: "",
        },
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

      dispatch(updateJustRegistered(userData?.personalDetails.justRegistered));
      dispatch(
        updatePersonalDetails({
          firstName: userData?.personalDetails.firstName,
          lastName: userData?.personalDetails.lastName,
          email: userData?.personalDetails.email,
          phone: userData?.personalDetails.phone,
          address: userData?.personalDetails.address,
          personalBio: userData?.personalDetails.personalBio,
          profilePicture: {
            raw: userData?.personalDetails.profileImagePreviewUrl,
            url: userData?.personalDetails.profileImagePreviewUrl,
            name: userData?.personalDetails.profilePictureName,
          },
          registerDate: userCredential.user.metadata.creationTime,
          reviewSubmit: userData?.personalDetails.reviewSubmit,
          acceptedTerms: userData?.personalDetails.acceptedTerms,
        })
      );
      dispatch(
        updateCompanyDetails({
          companyName: userData.companyDetails.companyName,
          generatedName: userData.companyDetails.generatedName,
          companyNumber: userData.companyDetails.companyNumber,
          companyAddress: userData.companyDetails.companyAddress,
          companyBio: userData.companyDetails.companyBio,
          companyProfilePix: {
            raw: userData.CompanyPix.companyProfilePixPreviewUrl,
            url: userData.CompanyPix.companyProfilePixPreviewUrl,
            name: userData.CompanyPix.companyProfilePixName,
          },
          reviewSubmit: userData?.companyDetails.reviewSubmit,
        })
      );
      dispatch(
        updateCompanyDocs({
          regCertificate: {
            raw: userData.RegCertificate.regCertificatePreviewUrl,
            url: userData.RegCertificate.regCertificatePreviewUrl,
            name: userData.RegCertificate.regCertificateName,
          },
          // vehInsurance: vehInsuranceUploadurl,
          vehInsurance: {
            raw: userData.VehInsurance.vehInsurancePreviewUrl,
            url: userData.VehInsurance.vehInsurancePreviewUrl,
            name: userData.VehInsurance.vehInsuranceName,
          },
          // pubInsurance: pubInsuranceUploadurl,
          pubInsurance: {
            raw: userData.PubInsurance.pubInsurancePreviewUrl,
            url: userData.PubInsurance.pubInsurancePreviewUrl,
            name: userData.PubInsurance.pubInsuranceName,
          },
          // tranInsurance: tranInsuranceUploadurl,
          tranInsurance: {
            raw: userData.TranInsurance.tranInsurancePreviewUrl,
            url: userData.TranInsurance.tranInsurancePreviewUrl,
            name: userData.TranInsurance.tranInsuranceName,
          },
          // drivingLicense: drivingLicenseUploadurl,
          drivingLicense: {
            raw: userData.DrivingLicense.drivingLicensePreviewUrl,
            url: userData.DrivingLicense.drivingLicensePreviewUrl,
            name: userData.DrivingLicense.drivingLicenseName,
          },
        })
      );

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
        dispatch(
          updateVerificationMessage(
            "Please verify your email via link sent to your mail, to login."
          )
        );
      }
      // switch (userCredential.user.emailVerified) {
      //   case true:
      //     dispatch(updateUserDetails(userCredential.user));
      //     switch (details.personalDetails.phone) {
      //       case true:
      //         router.back();

      //         break;
      //       case null:
      //         router.push("/onboarding/personal-details");
      //         break;

      //       default:
      //         break;
      //     }

      //     break;

      //   case false:
      //     setUser(userCredential.user);
      //     dispatch(
      //       updateVerificationMessage(
      //         "Please verify your email via link sent to your mail, to login."
      //       )
      //     );

      //     break;

      //   default:
      //     break;
      // }
    } catch (error) {
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

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
  updateJustRegistered,
  updateMoverPersonalDetails,
} from "@/store/moverSlice";

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

      dispatch(
        updateMoverPersonalDetails({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: details.personalDetails.phone,
          address: details.personalDetails.address,
          personalBio: details.personalDetails.personalBio,
          profilePicture: details.personalDetails.profilePicture,
        })
      );

      dispatch(updateJustRegistered(true));

      // toast(`Registration successful`, {
      //   duration: 8000,
      //   style: toastStyle1,
      // });
      emailConfirmation(userCredential.user);

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
      if (userCredential.user.emailVerified) {
        // setUser(userCredential.user);
        dispatch(updateUserDetails(userCredential.user));
        if (details.justRegistered) {
          router.push("/onboarding/personal-details");
        } else {
          router.push(`/mover-profile/dashboard/${userCredential.user.uid}`);
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

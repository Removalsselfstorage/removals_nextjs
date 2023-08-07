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

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  forgotPassword: async () => {},
  resendEmailVerification: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const { userDetails } = useSelector(getAllUserDetails);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (userDetails) => {
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

  const signUp = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // setUser(userCredential.user);
      // dispatch(updateUserDetails(userCredential.user));
      dispatch(
        updateSignupMessage(
          "Registered successfully! Please activate your email to get started"
        )
      );
      // toast(`Registration successful`, {
      //   duration: 8000,
      //   style: toastStyle1,
      // });
      emailConfirmation(userCredential.user);

      // Delay the router push by 3 seconds
      setTimeout(() => {
        router.push("/mover-login");
      }, 2000);

      setLoading(false);
    } catch (error) {
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
        router.back();
      } else {
        setUser(userCredential.user);
        dispatch(
          updateVerificationMessage(
            "Please verify your email via link sent to your mail, to login."
          )
        );
      }
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

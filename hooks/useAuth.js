import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { useRecoilState } from 'recoil'
// import { modalState, movieState, loginErrorState, signupErrorState } from '../atoms/modalAtom.'
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
} from "@/store/userSlice";

const AuthContext = createContext({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
});

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const dispatch = useDispatch();

  const userDetails = useSelector(getAllUserDetails);

  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user);
          dispatch(updateUserDetails(user));
          setLoading(false);
        } else {
          // Not logged in...
          setUser(null);
          // dispatch(updateUserDetails(null));
          // setLoading(true);
          // router.push("/login");
        }
        // setError("");

        setInitialLoading(false);
      }),
    [auth]
  );

  // useEffect(() => {
  //   setInitialLoading(true);
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // Logged in...
  //       setUser(user);
  //       dispatch(updateUserDetails(user));
  //     } else {
  //       // Not logged in...
  //       setUser(null);
  //     }
  //     setError("");
  //     setInitialLoading(false);
  //   });
  //   return unsubscribe;
  // }, [auth]);

  // const signUp = async (email, password) => {
  //   setLoading(true);

  //   await createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       setUser(userCredential.user);
  //       dispatch(updateUserDetails(userCredential.user));
  //       dispatch(updateSignupMessage("Registration successful"));
  //       router.push("/mover-login");
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       // setSignupError(error.message)
  //       setError(error.message);
  //       dispatch(updateSignupError(error.message));
  //     })
  //     .finally(() => setLoading(false));
  // };
  const signUp = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      dispatch(updateUserDetails(userCredential.user));
      dispatch(updateSignupMessage("Registration successful"));

      // Delay the router push by 3 seconds
      setTimeout(() => {
        router.push("/mover-login");
      }, 3000);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      dispatch(updateSignupError(error.message));
      setLoading(false);
    }
  };

  // const signIn = async (email, password) => {
  //   setLoading(true);
  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       setUser(userCredential.user);
  //       dispatch(updateUserDetails(userCredential.user));
  //       router.push("/");
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       dispatch(updateLoginError(error.message));
  //     })
  //     .finally(() => setLoading(false));
  // };
  const signIn = async (email, password) => {
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      dispatch(updateUserDetails(userCredential.user));

      // Delay the router push by 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 0);

      // setLoading(false);
    } catch (error) {
      setError(error.message);
      dispatch(updateLoginError(error.message));
      setLoading(false);
    }
  };

  // const logout = async () => {
  //   setLoading(true);

  //   signOut(auth)
  //     .then(() => {
  //       setUser(null);
  //       dispatch(updateUserDetails(null));
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //       dispatch(updateLoginError(error.message));
  //     })
  //     .finally(() => setLoading(false));
  // };

  const logout = async () => {
    setLoading(true);

    try {
      await signOut(auth);
      setUser(null);
      dispatch(updateUserDetails(null));
      router.push("/mover-login");
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
    () => ({ user, signUp, signIn, error, loading, logout, forgotPassword }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context comopnent.
export default function useAuth() {
  return useContext(AuthContext);
}

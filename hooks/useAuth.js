import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  // const [loginError, setLoginError] = useRecoilState(loginErrorState);
  // const [signupError, setSignupError] = useRecoilState(signupErrorState);

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

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUp = async (email, password) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        dispatch(updateUserDetails(userCredential.user));
        dispatch(updateSignupMessage("Registration successful"));
        router.push("/mover-login");
        setLoading(false);
      })
      .catch((error) => {
        // setSignupError(error.message)
        setError(error.message);
        dispatch(updateSignupError(error.message));
      })
      .finally(() => setLoading(false));
  };

  const signIn = async (email, password) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        dispatch(updateUserDetails(userCredential.user));
        router.push("/");
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        dispatch(updateLoginError(error.message));
      })
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
        dispatch(updateUserDetails(null));
      })
      .catch((error) => {
        setError(error.message);
        dispatch(updateLoginError(error.message));
      })
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({ user, signUp, signIn, error, loading, logout }),
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

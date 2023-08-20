import NormalLayout from "@/layouts/NormalLayout";
import Layout from "@/layouts/NormalLayout";
import "@/styles/globals.css";
import { Provider, useSelector } from "react-redux";
import store from "@/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";
import { persistStore } from "reduxjs-toolkit-persist";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/hooks/useAuth";
import { getAllUserDetails } from "@/store/userSlice";

let persistor = persistStore(store);

// persistor.flush().then(() => {
persistor.purge().then(() => {
  console.log("Persisted state has been cleared.");
});

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    // <SessionProvider session={session}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

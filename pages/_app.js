import NormalLayout from "@/layouts/NormalLayout";
import Layout from "@/layouts/NormalLayout";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import store from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/hooks/useAuth";

let persistor = persistStore(store);

// persistor.flush().then(() => {
//   console.log("Persisted state has been cleared.");
// });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
}

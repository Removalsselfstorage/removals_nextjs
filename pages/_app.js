import NormalLayout from "@/layouts/NormalLayout";
import Layout from "@/layouts/NormalLayout";
import "@/styles/globals.css";
import { Provider, useSelector } from "react-redux";
import store from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import { persistStore } from "reduxjs-toolkit-persist";
// import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/hooks/useAuth";
import { getAllUserDetails } from "@/store/userSlice";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import toast, { ToastBar, Toaster } from "react-hot-toast";

let persistor = persistStore(store);

// persistor.flush().then(() => {
// persistor.purge().then(() => {
//   console.log("Persisted state has been cleared.");
// });

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps: { ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Component {...pageProps} />
              <Toaster
                position="top-center"
                // reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  // Define default options
                  className: "",
                  // duration: 5000,
                  style: {
                    background: "#363636",
                    color: "#fff",
                  },

                  // Default options for specific types
                  // success: {
                  //   duration: 3000,
                  //   theme: {
                  //     primary: "green",
                  //     secondary: "black",
                  //   },
                  // },
                }}
              />
            </AuthProvider>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

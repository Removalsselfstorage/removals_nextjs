import NormalLayout from "@/layouts/NormalLayout";
import Layout from "@/layouts/NormalLayout";
import "@/styles/globals.css";
import "@/styles/nprogress.css";
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
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader1 from "@/components/loaders/loader1";
import nProgress from "nprogress";
import Router from "next/router";
import "react-big-calendar/lib/css/react-big-calendar.css";

let persistor = persistStore(store);

// persistor.flush().then(() => {
// persistor.purge().then(() => {
//   console.log("Persisted state has been cleared.");
// });

// Create a client
const queryClient = new QueryClient();

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

export default function App({ Component, pageProps: { ...pageProps } }) {
  // const [loading, setLoading] = useState(false);
  // const router = useRouter();

  // useEffect(() => {
  //   const handleStart = () => {
  //     setLoading(true);
  //   };
  //   const handleComplete = () => {
  //     setLoading(false);
  //   };

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // }, [router]);

  return (
    <>
      {/* <Head>
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head> */}

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <div className=''>
                {/* {loading && <Loader1 />} */}
                <Component {...pageProps} />
              </div>
              <Toaster
                position='top-center'
                // reverseOrder={false}
                gutter={8}
                containerClassName=''
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

import CheckIsLogin from "@/components/CheckIsLogin";
import Protection from "@/components/Protection";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/router";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {router.pathname === "/signin" || router.pathname === "/signup" ? (
          <CheckIsLogin>
            <Component {...pageProps} />
          </CheckIsLogin>
        ) : (
          <Protection>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
          </Protection>
        )}
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

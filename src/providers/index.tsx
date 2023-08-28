import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Toaster } from "react-hot-toast";
import { theme } from "../theme";
import Layout from "@soaltee-loyalty/components/organisms/layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 30 * 1000,
      //   staleTime: 1000 * 60 * 5 // 5 minutes
    },
  },
});

const Provider = ({ children }: IProvider) => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Toaster position="bottom-right" />
            <HelmetProvider>{children}</HelmetProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </Layout>
        </QueryClientProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

interface IProvider {
  children: React.ReactNode;
}

export default Provider;

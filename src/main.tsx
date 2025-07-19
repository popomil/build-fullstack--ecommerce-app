import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider } from "@chakra-ui/react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import InternetConnectionProvider from "./components/provider/InternetConnectionService.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <InternetConnectionProvider >
          <ChakraProvider>
              <App />
          </ChakraProvider>
      </InternetConnectionProvider>
    </Provider>
</QueryClientProvider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider , QueryClient} from "react-query"
import { Provider } from "react-redux";
import { store } from "./Store/index.jsx";

const queryclient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryclient}>
    <BrowserRouter>
    
    <Provider store={store}>
      <App />
      </Provider>
    </BrowserRouter>
  </QueryClientProvider>
);

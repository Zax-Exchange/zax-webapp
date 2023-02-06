import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { client } from "./ApolloClient/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext";
import { LocaleContextProvider } from "./context/LocaleContext";

const app = (
  <AuthProvider>
    <BrowserRouter>
      <React.StrictMode>
        <ApolloProvider client={client}>
          <LocaleContextProvider>
            <App />
          </LocaleContextProvider>
        </ApolloProvider>
      </React.StrictMode>
    </BrowserRouter>
  </AuthProvider>
);
const root = ReactDOM.render(app, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);

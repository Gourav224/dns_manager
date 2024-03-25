import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import AuthLayout from "./components/AuthLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import AddDomain from "./pages/AddDomain.jsx"; // Corrected the component name
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/adddomain",
        element: (
          <AuthLayout>
            <AddDomain /> 
          </AuthLayout>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

import "./App.css";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateEvents from "./pages/UpdateEvents";

function App() {
  const router = createBrowserRouter([
    {
      element: <Dashboard />,
      path: "/",
    },
    {
      element: <UpdateEvents />,
      path: "/update"
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

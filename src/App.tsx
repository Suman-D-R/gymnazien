import "./App.css";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateEvents from "./pages/UpdateEvents";
import CreateEvent from "./pages/CreateEvent";

function App() {
  const router = createBrowserRouter([
    {
      element: <Dashboard />,
      path: "/",
    },
    {
      element: <UpdateEvents />,
      path: "/update"
    },
    {
      element: <CreateEvent />,
      path: "/create-event"
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

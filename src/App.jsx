import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Single_Gif_Info from "./pages/Single_Gif_Info";
import SearchPage from "./pages/SearchPage";
import Favorite from "./pages/Favorite";
import GifProvider from "./context/context"; // Corrected import

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:category',
        element: <Category />
      },
      {
        path: '/search/:query',
        element: <SearchPage />
      },
      {
        path: '/:type/:slug',
        element: <Single_Gif_Info />
      },
      {
        path: '/favorite',
        element: <Favorite />
      }
    ]
  }
]);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;

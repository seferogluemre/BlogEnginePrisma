
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import { ErrorLayout, HomePage, PostDetailPage, PostsPage } from './routes';
import { postsLoader } from './routes/posts/Posts_loader'
import { postDetailLoader } from './routes/PostDetail/postDetailLoader'
import './App.css'


const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        loader: postsLoader,
        path: "/posts",
        element: <PostsPage />
      },
      {
        loader: postDetailLoader,
        path: "/posts/:postId",
        element: <PostDetailPage />
      }
    ]

  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);

// src/pages/Error400.jsx
import ErrorPage from "../components/ErrorPage";

export default function Error400() {
  return (
    <ErrorPage
      errorCode="400"
      description="Something Went Wrong - The server cannot process the request due to invalid syntax."
      image="/img/400.png"
    />
  );
}
// src/pages/Error401.jsx
import ErrorPage from "../components/ErrorPage";

export default function Error401() {
  return (
    <ErrorPage
      errorCode="401"
      description="Authentication Required - Please log in to access this resource."
      image="/img/401.png"
    />
  );
}
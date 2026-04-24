// src/pages/Error403.jsx
import ErrorPage from "../components/ErrorPage";

export default function Error403() {
  return (
    <ErrorPage
      errorCode="403"
      description="Access Forbidden - You don't have permission to access this page."
      image="/img/403.png"
    />
  );
}
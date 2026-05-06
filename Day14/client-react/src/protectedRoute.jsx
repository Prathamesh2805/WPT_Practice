import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const token = sessionStorage.getItem('token');

  if (token != null && token !== undefined) {
    return <>{props.children}</>;
  }

  return <Navigate to="/signin" replace={true} />;
}

export default ProtectedRoute;
// import { Navigate } from "react-router-dom";
// import { auth } from "../firebase/firebase";

// function ProtectedRoute({ children }) {
//   if (!auth.currentUser) {
//     alert("Please login first!");
//     return <Navigate to="/login" />;
//   }
//   return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

function ProtectedRoute({ children }) {
  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
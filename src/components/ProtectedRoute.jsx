import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, userType }) {
  const userData = JSON.parse(localStorage.getItem('tranlyUser') || 'null');
  
  if (!userData) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && userData.userType !== userType) {
    // If user type doesn't match, redirect to their correct dashboard
    if (userData.userType === 'trainer') {
      return <Navigate to="/trainer-dashboard" replace />;
    } else {
      return <Navigate to="/client-dashboard" replace />;
    }
  }
  
  return children;
}

export default ProtectedRoute;


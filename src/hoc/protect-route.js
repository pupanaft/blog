import { Navigate } from 'react-router-dom'

function ProtectedRoute({ userInfo, children }) {
  if (!userInfo) {
    return <Navigate to="/" replace />
  }
  
  return children
}
export default ProtectedRoute
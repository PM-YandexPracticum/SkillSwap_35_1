import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactNode;
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

// заглушка авторизации — заменить
const useAuth = (): { isAuth: boolean } => {
  const accessToken = localStorage.getItem("accessToken");
  return { isAuth: Boolean(accessToken) };
};

const ProtectedRoute = ({ onlyUnAuth = false, children }: ProtectedRouteProps) => {
  const { isAuth } = useAuth();
  const location = useLocation();
  const state = location.state as LocationState | null;

  if (onlyUnAuth && isAuth) {
    // авторизованных пользователей не пускаем на login/register
    return <Navigate to={state?.from?.pathname || "/"} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    // неавторизованных отправляем на login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // если проверки пройдены → рендерим содержимое
  return children;
};

export default ProtectedRoute;

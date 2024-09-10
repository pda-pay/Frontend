import { Navigate, Outlet } from "react-router-dom";
import userAPI from "./api/userAPI";
import { useEffect, useState } from "react";

interface ProtectedPageProps {
  element?: JSX.Element;
}

export default function ProtectedPages({ element }: ProtectedPageProps) {
  const userservice = new userAPI();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const getUserInfo = async (): Promise<boolean> => {
    try {
      const response = await userservice.checkMem();

      if (response.status === 200 || response.status === 201) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const result = await getUserInfo();
      setIsAuthenticated(result);
    };

    checkAuthentication();
  }, []);

  if (isAuthenticated === null) {
    // 로딩 중인 상태를 처리 (optional)
    return <div>Loading...</div>;
  }

  // 인증 상태에 따라 조건 처리
  return isAuthenticated ? (
    element ? (
      element
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/" replace />
  );
}

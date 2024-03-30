import React, { useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { UserContext, type IUserContext } from "@/contexts/UserContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setToken } = useContext(UserContext) as IUserContext;
  //   const pingService = new ApiService(`clubs/?page=0`);
  //   const navigate = useNavigate();

  // sends a request on every page load with token, if it returns a 401, user will be logged out
  //   const { error } = useQuery({
  //     queryKey: ["ping"],
  //     queryFn: () => pingService.getById(""),
  //     retry: 1,
  //     refetchOnWindowFocus: false,
  //   });

  //   function logOutUnauthorizedUser() {
  //     if (typeof window !== "undefined") {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //     }

  //     navigate("/login");
  //   }

  // logs out user and deletes token stored in local storage
  //   if (error instanceof AxiosError) {
  //     error.response?.status === 401 ? logOutUnauthorizedUser() : null;
  //   }

  /* gets the token and user object from local storage and 
  loads it into the user context on every page mount */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    // if (!token || !user) navigate("/login");

    if (user && token) {
      setUser(JSON.parse(user || ""));
      setToken(token);
    }
  }, [setToken, setUser]);
  return <>{children}</>;
}

"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({
  children,
  initialUser,
  initialrefreshToken,
  initialaccessToken,
}) => {
  const [user, setUser] = useState(initialUser);
  const [refreshToken, setRefreshToken] = useState(initialrefreshToken);
  const [accessToken, setAccessToken] = useState(initialaccessToken);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

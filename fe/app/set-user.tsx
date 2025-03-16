"use client";

import { useUserStore } from "@/lib/userStore";
import { AccountType } from "./validate";
import { useEffect } from "react";

const UserLogin = (user: { user: AccountType }) => {
  console.log(user);
  const { setUser } = useUserStore();
  useEffect(() => {
    if (user.user) setUser({ ...user.user, userId: user.user._id });
  }, [user, setUser]);
  return null;
};

export default UserLogin;

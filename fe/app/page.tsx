"use client";
import { useUser } from "./UserContext";

export default function Home() {
  const { user } = useUser();
  console.log(user);
  return;
}

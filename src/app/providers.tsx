"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setToken } from "@/features/auth/authSlice";

function AuthBootstrap() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const tokenCookie = document.cookie
      .split(";")
      .map((s) => s.trim())
      .find((s) => s.startsWith("auth_token="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);
  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthBootstrap />
      <Header />
      {children}
      <Toaster position="top-right" richColors />
    </Provider>
  );
}
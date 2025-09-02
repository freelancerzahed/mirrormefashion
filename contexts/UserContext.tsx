"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
interface User {
  id: number;
  name: string;
  email: string;
  // Add other user fields if needed
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);
 const router = useRouter(); // ✅ useRouter must be called here inside component
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          user_type: "customer",
          login_by: "email",
        }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data;

      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        throw new Error("Backend returned non-JSON response");
      }

      if (!res.ok) throw new Error(data.error || "Login failed");

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (data.token) {
        document.cookie = `token=${data.token}; path=/;`;
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", {
      method: "GET",          // Must match proxy
      credentials: "include",
    });

    const data = await res.json();
    console.log("Backend logout response:", data);
  } catch (err) {
    console.error("Backend logout failed", err);
  } finally {
    // Clear cookies and local storage
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");      // Redirect to login page
  }
};


  return (
    <UserContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};

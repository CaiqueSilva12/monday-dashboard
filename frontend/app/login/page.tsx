"use client";

import { loginWithMonday } from "@/services/authService";
import { Button, Card } from "antd";

const MondayLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" className="mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="16" r="5" fill="#FF5F00"/>
    <circle cx="16" cy="16" r="5" fill="#FFD600"/>
    <circle cx="24" cy="16" r="5" fill="#00C875"/>
  </svg>
);

export default function LoginPage() {
  const handleLogin = () => {
    loginWithMonday();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
      <Card className="w-full max-w-md shadow-xl rounded-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-6">Sign in to Monday Dashboard</h1>
        <Button
          onClick={handleLogin}
          className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition font-semibold text-black text-base py-2"
          style={{ height: 48 }}
        >
          <MondayLogo />
          Login with Monday.com
        </Button>
      </Card>
    </div>
  );
} 
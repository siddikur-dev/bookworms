'use client';

import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // Next.js uses next/navigation
import useAuth from "./useAuth";

// Create axios instance
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000", // Your BookWorm backend URL
});

const useAxiosSecure = () => {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // 1. Request Interceptor: Add Token to Headers
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        if (user) {
          // Get the latest token from Firebase
          const token = await user.getIdToken();
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 2. Response Interceptor: Handle 401/403 Errors
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response ? error.response.status : null;

        if (status === 401 || status === 403) {
          await Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Please login again to continue.",
            confirmButtonColor: "var(--color-primary)",
          });

          // Log out and redirect
          await signOutUser();
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors on unmount
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, router, signOutUser]);

  return axiosSecure;
};

export default useAxiosSecure;
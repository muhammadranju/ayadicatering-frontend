"use client";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/redux/hooks";
import { useGetUserProfileQuery } from "@/lib/redux/features/api/authApiSlice";
import {
  selectToken,
  selectIsAuthenticated,
  logout,
} from "@/lib/redux/features/auth/authSlice";

export const useAuthCheck = () => {
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();

  const {
    data: userProfile,
    error,
    isLoading,
    refetch,
  } = useGetUserProfileQuery(undefined, {
    skip: !token || !isAuthenticated,
  });

  useEffect(() => {
    if (error && isAuthenticated) {
      // Only logout if the error is 401 (Unauthorized)
      if ("status" in error && error.status === 401) {
        console.error("Failed to fetch user profile (Unauthorized):", error);
        dispatch(logout());
      } else {
        console.error("Failed to fetch user profile:", error);
      }
    }
  }, [error, isAuthenticated, dispatch]);

  return {
    userProfile,
    isLoading,
    error,
    refetch,
  };
};

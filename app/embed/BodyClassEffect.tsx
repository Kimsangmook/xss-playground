"use client";

import { useEffect } from "react";

export const BodyClassEffect = () => {
  useEffect(() => {
    document.body.classList.add("embed-route");
    return () => {
      document.body.classList.remove("embed-route");
    };
  }, []);
  return null;
};

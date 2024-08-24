// app/page.js
"use client";

import { useRouter } from "next/navigation"; // Use the new next/navigation hook for app directory
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the upload page
    router.push("/welcome");
  }, [router]);

  return null; // Redirecting immediately, no need to render anything
}
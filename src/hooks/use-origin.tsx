import { useState, useEffect } from "react";

export function useOrigin() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (typeof window !== "undefined") {
    return window.location.origin ?? "";
  }

  return null;
}

import { useEffect } from "react";

interface useScrollToChatProps {
  bottomRef: React.RefObject<HTMLDivElement>;
}

export function useScrollToChat({ bottomRef }: useScrollToChatProps) {
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 150);
  }, [bottomRef]);
}

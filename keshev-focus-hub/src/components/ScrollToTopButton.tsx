
import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_TRIGGER = 200; // px

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > SCROLL_TRIGGER);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return show ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 left-5 z-[100] bg-primary/90 hover:bg-primary text-white rounded-full p-3 shadow-lg animate-fade-in transition transition-colors"
      aria-label="חזור להתחלה"
      style={{ boxShadow: "0 2px 16px 0 #a77b52bb" }}
    >
      <ArrowUp size={28} />
    </button>
  ) : null;
};
export default ScrollToTopButton;

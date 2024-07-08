"use client";

import { PRODUCT_CATEGORIES } from "@/constants";
import { useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export default function NavItems() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, []);
  const isAnyActive = activeIndex !== null;
  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));
  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };
        const isActive = activeIndex === index;
        return (
          <NavItem
            key={category.value}
            category={category}
            isActive={isActive}
            handleOpen={handleOpen}
            isAnyActive={isAnyActive}
          />
        );
      })}
    </div>
  );
}

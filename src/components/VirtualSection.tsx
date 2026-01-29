import { type ReactNode } from "react";
import { SkeletonSlide } from "./SkeletonSlide";

interface VirtualSectionProps {
  id: string;
  index: number;
  activeIndex: number;
  children: ReactNode;
}

export const VirtualSection = ({ id, index, activeIndex, children }: VirtualSectionProps) => {
  // Logic: Pre-load 2 pages down and up.
  // If index is within range [activeIndex - 2, activeIndex + 2], render content.
  // Otherwise, render Skeleton.
  const isVisible = Math.abs(index - activeIndex) <= 2;

  return (
    <section id={id} className="relative w-full h-screen overflow-hidden snap-start">
      {isVisible ? children : <SkeletonSlide />}
    </section>
  );
};

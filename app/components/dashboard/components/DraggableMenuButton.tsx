"use client";

import { Menu, X } from "lucide-react";
import { useRef, useState } from "react";

type DraggableMenuButtonProps = {
  open: boolean;
  onToggle: () => void;
};

export default function DraggableMenuButton({
  open,
  onToggle,
}: DraggableMenuButtonProps) {
  const [position, setPosition] = useState({
    x: 16,
    y: 80,
  });

  const dragStart = useRef({
    x: 0,
    y: 0,
    buttonX: 0,
    buttonY: 0,
  });

  const isDragging = useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);

    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      buttonX: position.x,
      buttonY: position.y,
    };

    isDragging.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }

    const deltaX = event.clientX - dragStart.current.x;
    const deltaY = event.clientY - dragStart.current.y;

    if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
      isDragging.current = true;
    }

    const buttonSize = 48;
    const gap = 8;

    const newX = Math.max(
      gap,
      Math.min(
        dragStart.current.buttonX + deltaX,
        window.innerWidth - buttonSize - gap,
      ),
    );

    const newY = Math.max(
      gap,
      Math.min(
        dragStart.current.buttonY + deltaY,
        window.innerHeight - buttonSize - gap,
      ),
    );

    setPosition({
      x: newX,
      y: newY,
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleClick = () => {
    if (!isDragging.current) {
      onToggle();
    }
  };

  return (
    <button
      type="button"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      className={`fixed z-[80] flex h-12 w-12 touch-none items-center justify-center rounded-full border shadow-lg transition-all duration-300 active:cursor-grabbing md:hidden ${
        open
          ? "bg-primary text-primary-foreground shadow-xl"
          : "bg-background text-foreground hover:shadow-xl"
      }`}
      style={{
        left: position.x,
        top: position.y,
      }}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      {open ? <X size={22} /> : <Menu size={22} />}
    </button>
  );
}

"use client"
import { useMousePosition } from "@/hooks/useMousePositionHook";



export function ShippingSoon() {
  const { x, y } = useMousePosition();


  if (x === null || y === null) return null;
  return (
    <>
        <span 
          style={{
            position: 'fixed',
            left: `${x + 20}px`,
            top: `${y + 20}px`,
            pointerEvents: 'none',
          }}
          className="bg-black dark:bg-white px-2 py-1 rounded-lg text-white dark:text-black text-[14px]"
        >
          Shipping Soon
        </span>
    </>
  );
}
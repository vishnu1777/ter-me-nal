"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Cursor {
  id: string;
  x: number;
  y: number;
  color: string;
}

export default function RealtimeCursors() {
  const [cursors, setCursors] = useState<{ [key: string]: Cursor }>({});
  const [myId] = useState(() => Math.random().toString(36).substr(2, 9));

  useEffect(() => {
    // Subscribe to cursor movements
    const channel = supabase.channel("cursors");

    channel
      .on("broadcast", { event: "cursor" }, ({ payload }) => {
        if (payload.id !== myId) {
          setCursors((prev) => ({
            ...prev,
            [payload.id]: payload,
          }));

          // Remove cursor after 3 seconds of inactivity
          setTimeout(() => {
            setCursors((prev) => {
              const newCursors = { ...prev };
              delete newCursors[payload.id];
              return newCursors;
            });
          }, 3000);
        }
      })
      .subscribe();

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      channel.send({
        type: "broadcast",
        event: "cursor",
        payload: {
          id: myId,
          x: e.clientX,
          y: e.clientY,
          color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      channel.unsubscribe();
    };
  }, [myId]);

  return (
    <>
      {Object.values(cursors).map((cursor) => (
        <div
          key={cursor.id}
          className="fixed pointer-events-none z-50 transition-all duration-100"
          style={{
            left: cursor.x,
            top: cursor.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: cursor.color }}
          />
        </div>
      ))}
    </>
  );
}

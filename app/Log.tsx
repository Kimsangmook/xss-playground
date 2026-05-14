"use client";

import { useEffect, useRef, useState } from "react";

export const useLog = () => {
  const [lines, setLines] = useState<string[]>([]);
  const push = (msg: string) => {
    const time = new Date().toISOString().slice(11, 19);
    setLines((prev) => [...prev, `[${time}] ${msg}`]);
  };
  const clear = () => setLines([]);
  return { lines, push, clear };
};

interface ILogProps {
  lines: string[];
}

export const Log = ({ lines }: ILogProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);
  return (
    <div ref={ref} className="log">
      {lines.length === 0 ? "// 로그 없음" : lines.join("\n")}
    </div>
  );
};

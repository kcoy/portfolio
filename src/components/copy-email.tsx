"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function CopyEmail({ className = "" }: { className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button type="button" onClick={copy} className={className}>
      <span aria-live="polite">
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Copy failed — select the address" : "Copy email"}
      </span>
    </button>
  );
}

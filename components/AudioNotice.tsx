"use client";

import { Volume2, X } from "lucide-react";
import { useState } from "react";
import { enableAudio } from "@/components/scenery/audio";

export function AudioNotice() {
  const [visible, setVisible] = useState(true);

  async function handleEnable() {
    await enableAudio();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <aside className="audio-notice" role="status">
      <span>Best experienced with sound.</span>
      <button className="audio-notice-enable" onClick={handleEnable} type="button">
        <Volume2 size={14} />
        Enable sound
      </button>
      <button aria-label="Dismiss sound notice" className="audio-notice-dismiss" onClick={() => setVisible(false)} type="button">
        <X size={14} />
      </button>
    </aside>
  );
}

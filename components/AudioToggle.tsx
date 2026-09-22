"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useState } from "react";
import { disableAudio, enableAudio, isAudioEnabled } from "@/components/scenery/audio";

export function AudioToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(isAudioEnabled());

    function onAudioStateChange() {
      setEnabled(isAudioEnabled());
    }

    window.addEventListener("audio:state-changed", onAudioStateChange);
    return () => window.removeEventListener("audio:state-changed", onAudioStateChange);
  }, []);

  async function handleToggle() {
    if (enabled) {
      disableAudio();
      setEnabled(false);
      return;
    }

    const started = await enableAudio();
    setEnabled(started);
  }

  return (
    <button
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      className="audio-toggle"
      onClick={handleToggle}
      type="button"
    >
      {enabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
    </button>
  );
}

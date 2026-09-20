"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useState } from "react";

export function DemoVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const poster = `https://img.youtube.com/vi/${youtubeId}/${posterFailed ? "hqdefault" : "maxresdefault"}.jpg`;

  return (
    <div className="relative mt-10 aspect-video w-full overflow-hidden border-2 border-[var(--rule)] bg-[var(--surface-strong)]">
      {isPlaying ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
        />
      ) : (
        <button
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
          onClick={() => setIsPlaying(true)}
          type="button"
        >
          <Image
            alt=""
            className="object-cover"
            fill
            onError={() => setPosterFailed(true)}
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            src={poster}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/35 transition-colors duration-150 group-hover:bg-black/20">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--cream)] bg-[var(--accent)] pl-1 text-[var(--cream)]">
              <Play size={22} />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}

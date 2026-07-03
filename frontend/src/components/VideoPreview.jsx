import React from "react";
import { CirclePlay } from "lucide-react";

export default function VideoPreview({ video }) {
  const thumbnail = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Ver ${video.title} en YouTube`}
      className="group/video block bg-white p-2"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl border border-brand-pink/15 bg-brand-ink">
        <img
          src={thumbnail}
          alt={video.title}
          loading="lazy"
          onLoad={(event) => {
            if (
              event.currentTarget.naturalWidth <= 120 &&
              event.currentTarget.src !== fallbackThumbnail
            ) {
              event.currentTarget.src = fallbackThumbnail;
            }
          }}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackThumbnail;
          }}
          className="h-full w-full object-cover transition-transform duration-700 group-hover/video:scale-[1.04]"
        />

        <span className="absolute inset-0 bg-gradient-to-t from-[#321426]/65 via-[#321426]/10 to-transparent" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink text-white shadow-[0_16px_35px_-18px_rgba(50,20,38,0.95)] transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-brand-blue">
            <CirclePlay size={34} strokeWidth={1.8} />
          </span>
        </span>

        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-brand-ink shadow-sm backdrop-blur-sm transition-colors duration-300 group-hover/video:bg-brand-lavender">
          Mirar en YouTube
        </span>
      </div>
    </a>
  );
}

/** Vista previa accesible que permite reproducir o abrir un video externo. */
import React, { useState } from "react";
import { CirclePlay, ExternalLink, RotateCcw } from "lucide-react";

export default function VideoPreview({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const fallbackThumbnail = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
  const origin =
    typeof window === "undefined" ? "" : `&origin=${window.location.origin}`;
  const embedSrc = `${video.embedUrl}${
    video.embedUrl.includes("?") ? "&" : "?"
  }autoplay=1&modestbranding=1&enablejsapi=1${origin}`;

  return (
    <div className="group/video bg-white p-2">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-brand-pink/15 bg-brand-ink">
        {isPlaying ? (
          <>
            <iframe
              src={embedSrc}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full border-0"
            />

            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="absolute left-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-brand-lavender"
              aria-label="Volver a la vista previa"
            >
              <RotateCcw size={16} />
            </button>

            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-brand-ink shadow-sm backdrop-blur-sm transition-colors hover:bg-brand-lavender"
            >
              YouTube
              <ExternalLink size={13} />
            </a>
          </>
        ) : (
          <>
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

            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Reproducir ${video.title} aqui`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-pink text-white shadow-[0_16px_35px_-18px_rgba(50,20,38,0.95)] transition-all duration-300 hover:scale-110 hover:bg-brand-blue">
                <CirclePlay size={34} strokeWidth={1.8} />
              </span>
            </button>

            <a
              href={video.url}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-brand-ink shadow-sm backdrop-blur-sm transition-colors duration-300 hover:bg-brand-lavender"
            >
              Mirar en YouTube
              <ExternalLink size={13} />
            </a>
          </>
        )}
      </div>
    </div>
  );
}

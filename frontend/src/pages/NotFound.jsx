import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      data-testid="not-found-page"
      className="min-h-screen bg-brand-bg flex flex-col items-center justify-center text-center px-6"
    >
      <p className="overline mb-4">Error 404</p>
      <h1 className="font-heading text-5xl md:text-6xl text-white tracking-tighter">
        Página no encontrada.
      </h1>
      <p className="mt-4 text-brand-muted max-w-md">
        Lo que buscas no está aquí. Pero hay mucho por explorar.
      </p>
      <Link
        to="/"
        data-testid="not-found-home-link"
        className="mt-10 inline-flex items-center rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:bg-brand-pink transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

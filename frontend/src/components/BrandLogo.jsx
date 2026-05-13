import React from "react";

const LOGO_SRC = "/assets/cressara-logo.png";

const sizeClass = {
  nav: "h-12 md:h-14",
  footer: "h-20 md:h-24",
  admin: "h-10",
};

export default function BrandLogo({ size = "nav", className = "" }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Cressara"
      className={`${sizeClass[size] || sizeClass.nav} w-auto object-contain ${className}`}
    />
  );
}

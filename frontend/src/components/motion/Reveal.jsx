/**
 * Muestra su contenido cuando entra en la zona visible del navegador.
 * Permite controlar retraso y distancia sin repetir lógica en cada página.
 */
import React, { useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  distance = 28,
  ...props
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      {...props}
      ref={elementRef}
      className={`reveal ${isVisible ? "reveal-visible" : ""} ${className}`}
      style={{
        "--reveal-delay": `${delay}ms`,
        "--reveal-distance": `${distance}px`,
      }}
    >
      {children}
    </Component>
  );
}

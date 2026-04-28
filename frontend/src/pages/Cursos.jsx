import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CourseCard from "@/components/CourseCard";
import { api } from "@/lib/api";

const FILTERS = [
  { key: "all", label: "Todos" },
  { key: "mujeres", label: "Mujeres" },
  { key: "hombres", label: "Hombres" },
  { key: "relaciones", label: "Relaciones" },
];

export default function Cursos() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "all";
  const [filter, setFilter] = useState(initialCat);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/courses")
      .then((r) => setCourses(r.data))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return courses;
    return courses.filter((c) => c.category === filter);
  }, [courses, filter]);

  const onFilterChange = (key) => {
    setFilter(key);
    if (key === "all") {
      searchParams.delete("cat");
    } else {
      searchParams.set("cat", key);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <div data-testid="cursos-page" className="bg-brand-bg min-h-screen">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 pb-12">
        <p className="overline mb-6">Catálogo</p>
        <h1 className="font-heading text-5xl md:text-7xl text-white tracking-tighter font-bold leading-[0.95] max-w-4xl">
          Cursos que te enseñan a leer lo que sientes.
        </h1>
        <p className="mt-6 text-lg text-brand-muted max-w-2xl leading-relaxed">
          Programas estructurados de educación emocional, divididos por enfoque. Empieza por donde te cueste más.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => onFilterChange(f.key)}
              data-testid={`filter-${f.key}`}
              className={`px-5 py-2.5 rounded-full text-sm transition-all border ${
                filter === f.key
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-brand-muted border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-xl bg-brand-surface border border-white/5 aspect-[4/5] animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div
            data-testid="cursos-empty-state"
            className="rounded-xl border border-dashed border-white/10 p-16 text-center"
          >
            <p className="overline mb-3">Sin resultados</p>
            <p className="font-heading text-2xl md:text-3xl text-white tracking-tight">
              Aún no hay cursos en esta categoría.
            </p>
            <p className="mt-3 text-brand-muted">Vuelve pronto. Estamos preparando nuevo contenido.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((c, i) => (
              <CourseCard key={c.id} course={c} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

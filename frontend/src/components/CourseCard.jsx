import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CATEGORY_LABEL = {
  mujeres: "Mujeres",
  hombres: "Hombres",
  relaciones: "Relaciones",
};

export default function CourseCard({ course, index = 0 }) {
  return (
    <Link
      to={`/cursos/${course.id}`}
      data-testid={`course-card-${course.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-white/5 bg-brand-surface hover:border-white/20 transition-all duration-500 animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 60, 480)}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/20 to-transparent z-10" />
        {course.image_url ? (
          <img
            src={course.image_url}
            alt={course.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-brand-elevated" />
        )}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
          <span className="overline bg-black/40 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
            {CATEGORY_LABEL[course.category]}
          </span>
          {course.featured && (
            <span
              data-testid={`course-card-featured-${course.id}`}
              className="overline bg-brand-pink/20 text-brand-pink border border-brand-pink/30 px-2.5 py-1 rounded-full"
            >
              Destacado
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col">
        <h3 className="font-heading text-xl md:text-2xl text-white leading-tight tracking-tight">
          {course.title}
        </h3>
        <p className="mt-3 text-sm text-brand-muted leading-relaxed line-clamp-3">
          {course.short_description || course.description}
        </p>
        <div className="mt-6 flex items-center justify-between text-sm text-white/80 group-hover:text-white transition-colors">
          <span className="font-medium">Ver curso</span>
          <ArrowUpRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </div>
      </div>
    </Link>
  );
}

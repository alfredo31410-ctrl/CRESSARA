import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, LogOut, Search, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/BrandLogo";
import { useAuth } from "@/context/AuthContext";
import { api, formatApiErrorDetail } from "@/lib/api";
import { toast } from "sonner";

const CATEGORY_LABEL = {
  mujeres: "Mujeres",
  hombres: "Hombres",
  relaciones: "Relaciones",
};

const EMPTY_FORM = {
  title: "",
  description: "",
  short_description: "",
  category: "mujeres",
  image_url: "",
  video_url: "",
  extra_content: "",
  featured: false,
};

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/courses");
      setCourses(data);
    } catch (e) {
      toast.error("Error cargando cursos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.includes(q)
    );
  }, [courses, search]);

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setDialogOpen(true);
  };

  const openEdit = (c) => {
    setEditingId(c.id);
    setForm({
      title: c.title || "",
      description: c.description || "",
      short_description: c.short_description || "",
      category: c.category || "mujeres",
      image_url: c.image_url || "",
      video_url: c.video_url || "",
      extra_content: c.extra_content || "",
      featured: !!c.featured,
    });
    setDialogOpen(true);
  };

  const onSave = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Título y descripción son requeridos");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/courses/${editingId}`, form);
        toast.success("Curso actualizado");
      } else {
        await api.post("/courses", form);
        toast.success("Curso creado");
      }
      setDialogOpen(false);
      await fetchCourses();
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Error al guardar");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    try {
      await api.delete(`/courses/${deletingId}`);
      toast.success("Curso eliminado");
      setCourses((cs) => cs.filter((c) => c.id !== deletingId));
    } catch (err) {
      toast.error("Error al eliminar");
    } finally {
      setDeletingId(null);
    }
  };

  const onLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div data-testid="admin-dashboard-page" className="min-h-screen bg-brand-bg">
      {/* Top bar */}
      <header className="border-b border-white/5 sticky top-0 z-40 glass">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link to="/" data-testid="dashboard-logo" className="flex items-center gap-3">
            <BrandLogo size="admin" />
            <span className="text-xs font-mono tracking-widest text-brand-muted uppercase">Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline text-sm text-brand-muted">{user?.email}</span>
            <Button
              variant="ghost"
              onClick={onLogout}
              data-testid="dashboard-logout-btn"
              className="text-brand-muted hover:text-white hover:bg-white/5"
            >
              <LogOut size={16} className="mr-2" /> Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <p className="overline mb-3">Gestión de cursos</p>
            <h1 className="font-heading text-4xl md:text-5xl text-white tracking-tighter font-bold">
              Catálogo CRESARA.
            </h1>
            <p className="mt-2 text-sm text-brand-muted">
              {courses.length} {courses.length === 1 ? "curso" : "cursos"} en total ·{" "}
              {courses.filter((c) => c.featured).length} destacados
            </p>
          </div>
          <Button
            onClick={openCreate}
            data-testid="create-course-btn"
            className="rounded-full bg-white text-black hover:bg-brand-pink transition-colors h-11 px-6"
          >
            <Plus size={16} className="mr-2" /> Nuevo curso
          </Button>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              data-testid="dashboard-search"
              placeholder="Buscar cursos…"
              className="pl-10 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink focus-visible:border-brand-pink"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-brand-surface overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-brand-muted">Curso</TableHead>
                <TableHead className="text-brand-muted">Categoría</TableHead>
                <TableHead className="text-brand-muted">Destacado</TableHead>
                <TableHead className="text-brand-muted text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                [0, 1, 2].map((i) => (
                  <TableRow key={i} className="border-white/5">
                    <TableCell colSpan={4}>
                      <div className="h-8 bg-white/5 rounded animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))
              ) : filtered.length === 0 ? (
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableCell colSpan={4} className="text-center py-16">
                    <p className="overline mb-2">Sin cursos</p>
                    <p className="text-brand-muted text-sm">
                      {search ? "No hay resultados para tu búsqueda." : "Crea el primer curso para empezar."}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow
                    key={c.id}
                    data-testid={`course-row-${c.id}`}
                    className="border-white/5 hover:bg-white/5"
                  >
                    <TableCell className="text-white font-medium max-w-md">
                      <div className="flex items-center gap-3">
                        {c.image_url && (
                          <img
                            src={c.image_url}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover border border-white/10"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="truncate">{c.title}</p>
                          <p className="text-xs text-brand-subtle truncate">{c.short_description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-white/10 text-brand-muted font-normal">
                        {CATEGORY_LABEL[c.category]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {c.featured ? (
                        <span className="inline-flex items-center gap-1.5 text-xs text-brand-pink">
                          <Star size={12} fill="currentColor" /> Destacado
                        </span>
                      ) : (
                        <span className="text-xs text-brand-subtle">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEdit(c)}
                          data-testid={`edit-course-${c.id}`}
                          className="text-brand-muted hover:text-white hover:bg-white/5"
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDeletingId(c.id)}
                          data-testid={`delete-course-${c.id}`}
                          className="text-brand-muted hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          data-testid="course-dialog"
          className="max-w-2xl bg-brand-surface border-white/10 text-white max-h-[90vh] overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl tracking-tight">
              {editingId ? "Editar curso" : "Nuevo curso"}
            </DialogTitle>
            <DialogDescription className="text-brand-muted">
              {editingId ? "Actualiza la información del curso." : "Completa los datos del curso."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSave} className="space-y-5">
            <div>
              <Label className="text-xs uppercase tracking-widest text-brand-muted">Título</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                data-testid="form-title"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink"
              />
            </div>

            <div>
              <Label className="text-xs uppercase tracking-widest text-brand-muted">
                Descripción corta
              </Label>
              <Input
                value={form.short_description}
                onChange={(e) => setForm({ ...form, short_description: e.target.value })}
                data-testid="form-short-description"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink"
                placeholder="Una línea de gancho"
              />
            </div>

            <div>
              <Label className="text-xs uppercase tracking-widest text-brand-muted">Descripción</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
                rows={4}
                data-testid="form-description"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <Label className="text-xs uppercase tracking-widest text-brand-muted">Categoría</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) => setForm({ ...form, category: v })}
                >
                  <SelectTrigger
                    data-testid="form-category"
                    className="mt-2 bg-transparent border-white/10 text-white"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-brand-elevated border-white/10 text-white">
                    <SelectItem value="mujeres">Mujeres</SelectItem>
                    <SelectItem value="hombres">Hombres</SelectItem>
                    <SelectItem value="relaciones">Relaciones</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <label className="inline-flex items-center gap-3 cursor-pointer pb-2">
                  <Checkbox
                    checked={form.featured}
                    onCheckedChange={(v) => setForm({ ...form, featured: !!v })}
                    data-testid="form-featured"
                    className="border-white/30 data-[state=checked]:bg-brand-pink data-[state=checked]:border-brand-pink"
                  />
                  <span className="text-sm text-white">Marcar como destacado</span>
                </label>
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-widest text-brand-muted">
                URL de imagen / banner
              </Label>
              <Input
                value={form.image_url}
                onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                data-testid="form-image-url"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink"
                placeholder="https://…"
              />
            </div>

            <div>
              <Label className="text-xs uppercase tracking-widest text-brand-muted">
                URL de video (YouTube / Vimeo)
              </Label>
              <Input
                value={form.video_url}
                onChange={(e) => setForm({ ...form, video_url: e.target.value })}
                data-testid="form-video-url"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink"
                placeholder="https://www.youtube.com/watch?v=…"
              />
            </div>

            <div>
              <Label className="text-xs uppercase tracking-widest text-brand-muted">
                Contenido adicional
              </Label>
              <Textarea
                value={form.extra_content}
                onChange={(e) => setForm({ ...form, extra_content: e.target.value })}
                rows={4}
                data-testid="form-extra-content"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink"
                placeholder="Detalles, módulos, recursos…"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDialogOpen(false)}
                className="text-brand-muted hover:text-white hover:bg-white/5"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={saving}
                data-testid="form-submit"
                className="rounded-full bg-white text-black hover:bg-brand-pink transition-colors"
              >
                {saving ? "Guardando…" : editingId ? "Guardar cambios" : "Crear curso"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!deletingId} onOpenChange={(o) => !o && setDeletingId(null)}>
        <AlertDialogContent className="bg-brand-surface border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading text-2xl">¿Eliminar curso?</AlertDialogTitle>
            <AlertDialogDescription className="text-brand-muted">
              Esta acción no se puede deshacer. El curso se eliminará permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              data-testid="confirm-delete-btn"
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

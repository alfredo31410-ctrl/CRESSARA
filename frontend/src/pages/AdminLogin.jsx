import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user !== false && user !== null) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await login(email.trim().toLowerCase(), password);
    setLoading(false);
    if (res.ok) {
      toast.success("Bienvenido a CRESARA");
      navigate("/admin/dashboard");
    } else {
      toast.error(res.error || "Credenciales inválidas");
    }
  };

  return (
    <div
      data-testid="admin-login-page"
      className="min-h-screen bg-brand-bg flex items-center justify-center px-6 relative overflow-hidden"
    >
      <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full bg-brand-pink/15 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full bg-brand-blue/15 blur-3xl" />

      <div className="relative w-full max-w-md">
        <Link
          to="/"
          data-testid="login-back-home"
          className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Volver al inicio
        </Link>

        <div className="rounded-2xl border border-white/10 bg-brand-surface p-8 md:p-10">
          <p className="overline mb-3">Panel privado</p>
          <h1 className="font-heading text-3xl md:text-4xl text-white tracking-tighter font-bold mb-2">
            Admin CRESARA.
          </h1>
          <p className="text-sm text-brand-muted mb-8">
            Ingresa con tus credenciales para gestionar cursos.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-xs uppercase tracking-widest text-brand-muted">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                data-testid="login-email-input"
                placeholder="admin@cresara.com"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink focus-visible:border-brand-pink"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs uppercase tracking-widest text-brand-muted">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="login-password-input"
                placeholder="••••••••"
                className="mt-2 bg-transparent border-white/10 text-white focus-visible:ring-brand-pink focus-visible:border-brand-pink"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              data-testid="login-submit-btn"
              className="w-full rounded-full bg-brand-blue text-white hover:bg-brand-pink transition-colors h-11 text-sm font-medium"
            >
              {loading ? "Ingresando…" : "Ingresar"}
            </Button>
          </form>

          <p className="mt-8 text-xs text-brand-subtle font-mono tracking-wider">
            CRESARA · ADMIN
          </p>
        </div>
      </div>
    </div>
  );
}

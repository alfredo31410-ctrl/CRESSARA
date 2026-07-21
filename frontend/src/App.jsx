/**
 * Composición principal de la aplicación.
 * Reúne el estado de autenticación, las rutas y las notificaciones globales.
 */
import React from "react";
import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/features/auth/AuthContext";
import ProtectedRoute from "@/features/auth/ProtectedRoute";

import Home from "@/pages/public/Home";
import Comunidad from "@/pages/public/Comunidad";
import Nosotros from "@/pages/public/Nosotros";
import NotFound from "@/pages/public/NotFound";
import AvisoPrivacidad from "@/pages/legal/AvisoPrivacidad";
import TerminosCondiciones from "@/pages/legal/TerminosCondiciones";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import Productos from "@/pages/public/Productos";
import ScrollManager from "@/components/layout/ScrollManager";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <ScrollManager />

          <Routes>
            {/* Sitio público */}
            <Route path="/" element={<Home />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/aviso-de-privacidad" element={<AvisoPrivacidad />} />

            <Route
              path="/terminos-y-condiciones"
              element={<TerminosCondiciones />}
            />

            {/* Conserva enlaces antiguos y los dirige a la oferta vigente. */}
            <Route
              path="/cursos/*"
              element={<Navigate to="/comunidad" replace />}
            />

            {/* Administración */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Cualquier dirección desconocida muestra una página 404. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster theme="light" position="top-right" richColors />
      </AuthProvider>
    </div>
  );
}

export default App;

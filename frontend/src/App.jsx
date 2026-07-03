import React from "react";
import "@/App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

import Home from "@/pages/Home";
import Comunidad from "@/pages/Comunidad";
import Nosotros from "@/pages/Nosotros";
import AvisoPrivacidad from "@/pages/AvisoPrivacidad";
import TerminosCondiciones from "@/pages/TerminosCondiciones";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comunidad" element={<Comunidad />} />
            <Route path="/nosotros" element={<Nosotros />} />

            <Route
              path="/aviso-de-privacidad"
              element={<AvisoPrivacidad />}
            />

            <Route
              path="/terminos-y-condiciones"
              element={<TerminosCondiciones />}
            />

            <Route
              path="/cursos"
              element={<Navigate to="/comunidad" replace />}
            />

            <Route
              path="/cursos/:id"
              element={<Navigate to="/comunidad" replace />}
            />

            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        <Toaster theme="light" position="top-right" richColors />
      </AuthProvider>
    </div>
  );
}

export default App;
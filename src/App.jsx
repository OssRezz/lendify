import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/layout/DashboardLayout";
import { AuthProvider, RequireAuth } from "./context/auth/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import UnauthorizedPage from "./pages/auth/UnauthorizedPage";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import UserPage from "./pages/users/UserPage";
import BookPage from "./pages/books/BookPage";
import BorrowPage from "./pages/borrowings/BorrowPage";
import RequirePermission from "./components/permissions/RequirePermission"; // <== Importa aquí

const App = () => {
  useEffect(() => {
    fetch("/version.json")
      .then((response) => response.json())
      .then((serverVersion) => {
        const localVersion = localStorage.getItem("appVersion");
        console.log("URL Backend: ", import.meta.env.VITE_API_BASE_URL || "");
        console.log("Versión de la aplicación:", serverVersion.version);
        if (localVersion !== serverVersion.version) {
          localStorage.setItem("appVersion", serverVersion.version);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error("Error al verificar la versión de la aplicación:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Rutas protegidas */}
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />

              <Route element={<RequirePermission permission="users.index" />}>
                <Route path="/users" element={<UserPage />} />
              </Route>

              <Route element={<RequirePermission permission="books.index" />}>
                <Route path="/books" element={<BookPage />} />
              </Route>

              <Route
                element={<RequirePermission permission="borrowings.index" />}
              >
                <Route path="/borrowings" element={<BorrowPage />} />
              </Route>

            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
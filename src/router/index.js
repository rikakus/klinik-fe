import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SideBar from "../layout/Layout";
import Forget from "../pages/Auth/Forget";
import Login from "../pages/Auth/Login";
import Admin from "../pages/Admin";
import NotFound from "../pages/NotFound";
import Riwayat from "../components/Akun/Riwayat";
import JadwalDokter from "../pages/JadwalDokter";
import Register from "../pages/Auth/Register";
import Beranda from "../pages/Beranda";
import Aktivasi from "../pages/Auth/AktivasiAkun";
import Akun from "../pages/Akun";
import NewPasswword from "../pages/Auth/NewPassword";
import Periksa from "../pages/Periksa";

const PrivateRoute = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

const PrivateRouteAdmin = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token.role !== 0) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/aktivasi" element={<Aktivasi />} />
        <Route path="/password" element={<NewPasswword />} />

        <Route
          path="/"
          element={
            <SideBar>
              <Beranda />
            </SideBar>
          }
        />
        <Route path="/detail" element={<PrivateRoute />}>
          <Route
            index
            element={
              <SideBar>
                <Akun />
              </SideBar>
            }
          />
        </Route>
        <Route path="/periksa" element={<PrivateRoute />}>
          <Route
            index
            element={
              <SideBar>
                <Periksa />
              </SideBar>
            }
          />
        </Route>
        <Route path="/admin" element={<PrivateRouteAdmin />}>
          <Route
            index
            element={
              <SideBar>
                <Admin />
              </SideBar>
            }
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

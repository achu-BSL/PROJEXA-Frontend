import { Login } from "./pages/Auth/Login";
import { Routes, Route } from "react-router-dom";
import { Register } from "./pages/Auth/Register";
import { OverView } from "./pages/Personal-Project/OverView";
import { NewProject } from "./pages/Personal-Project/NewProject";
import { ProjectDetails } from "./pages/Personal-Project/ProjectDetails";
import { AuthRoute } from "./utils/AuthRoute";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { ProjectSpace } from "@pages/Personal-Project/ProjectSpace";

import "./App.css";
import { Settings } from "@pages/Settings";
import { Profile } from "@pages/Profile";

export const App = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthRoute />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="project">
          <Route path="personal">
            <Route index element={<OverView />} />
            <Route path="new" element={<NewProject />} />
            <Route path=":project_id">
              <Route index element={<ProjectDetails />} />
              <Route path="space" element={<ProjectSpace />} />
            </Route>
          </Route>
        </Route>
        <Route path="user">
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>
    </Routes>
  );
};

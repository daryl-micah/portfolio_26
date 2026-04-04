import { Navigate, Route, Routes } from "react-router-dom";
import ExternalRedirect from "./components/ExternalRedirect";
import HomePage from "./components/HomePage";

const CORTEX_MAIL_URL =
  import.meta.env.VITE_CORTEX_MAIL_URL ??
  "https://cortex-mail-azure.vercel.app";

const PEANUT_URL =
  import.meta.env.VITE_PEANUT_STORE_URL ??
  "https://play.google.com/store/apps/details?id=in.gov.apeda.peanut&pli=1";

const RESUME_URL = import.meta.env.VITE_RESUME_LINK ?? "#";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            cortexRoute="/cortex-mail"
            peanutUrl={PEANUT_URL}
            resumeUrl={RESUME_URL}
          />
        }
      />
      <Route
        path="/cortex-mail"
        element={<ExternalRedirect to={CORTEX_MAIL_URL} />}
      />
      <Route
        path="/website/cortex-mail"
        element={<ExternalRedirect to={CORTEX_MAIL_URL} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

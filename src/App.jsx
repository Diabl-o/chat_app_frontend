import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div
                className="text-white h-[100vh] flex items-center justify-center bg-cover"
                style={{ backgroundImage: "url('../assets/')" }}
              >
                <Login />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

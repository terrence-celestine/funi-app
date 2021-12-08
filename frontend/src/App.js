import "./App.css";
import TopBar from "./components/topbar";
import MainMenu from "./components/menu";
import { Routes, Route } from "react-router-dom";
import ViewShows from "./components/viewShows";
import ShowDetails from "./components/showDetails";
import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";
import Footer from "./components/Footer";
import Login from "./components/Login";
import useToken from "./helpers/useToken";

function App() {
  const { token, setToken } = useToken();
  let activeUser = false;
  console.log(token);
  if (token) {
    console.log(token);
    activeUser = true;
  }
  const logOutUser = () => {
    localStorage.removeItem("funi_app_token");
    window.location.reload();
  };

  return (
    <div className="App">
      <>
        <header>
          <TopBar />
          <MainMenu activeUser={activeUser} logOutUser={logOutUser} />
        </header>
        <main>
          <Routes>
            <Route index element={<Home user={activeUser} />}></Route>
            <Route path="shows">
              <Route path=":showHandle" element={<ShowDetails />}></Route>
              <Route index element={<ViewShows />}></Route>
            </Route>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="v">
              <Route
                path=":showHandle/:episodeID"
                element={<VideoPlayer />}
              ></Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </>
    </div>
  );
}

export default App;

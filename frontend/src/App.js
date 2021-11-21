import "./App.css";
import { useState, useEffect } from "react";
import TopBar from "./components/topbar";
import MainMenu from "./components/menu";
import { Routes, Route } from "react-router-dom";
import ViewShows from "./components/viewShows";
import ShowDetails from "./components/showDetails";
import Home from "./components/Home";
import VideoPlayer from "./components/VideoPlayer";
import Footer from "./components/Footer";

function App() {
  const [user, setUser] = useState(true);

  useEffect(() => {
    setUser(true);
  }, [user]);
  return (
    <div className="App">
      <>
        <header>
          <TopBar />
          <MainMenu activeUser={user} />
        </header>
        <main>
          <Routes>
            <Route index element={<Home user={user} />}></Route>
            <Route path="shows">
              <Route path=":showHandle" element={<ShowDetails />}></Route>
              <Route index element={<ViewShows />}></Route>
            </Route>
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

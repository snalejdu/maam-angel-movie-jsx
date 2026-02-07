import "./App.css";
import MovieCard from "./component/MovieCard";
import Home from "./pages/Home";

function App() {
  return (
    <>
         <Home />

      <MovieCard
        movie={{
          title: "Avatar Way of Water",
          release_date: "2026",
         
        }}
      />
   
    </>
  );
}

export default App;

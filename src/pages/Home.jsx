import MovieCard from "../component/MovieCard";
import {useState} from "react";
import "../css/Home.css"

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const movie = [
        {id: 1, title:"Spiderman",  release_date:"2026"},
        {id: 2, title:"Spiderman Far from Home", release_date:"2025"},
        {id: 3, title:"Spiderman No Way Home", release_date:"2024"}
    ];

    const handleSearch = (e) => {
        e.preventDefault();
    };
  

    return (
        <div className="home">

           <form onSubmit={handleSearch} className="search-form">
            <input type="text"
                   placeholder="Search for Movie"
                   className="search-input"
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)} />
           </form>


            <div className="movie-grid">
                {movie.map((movie) => (
                    movie.title.toLowerCase().includes(searchQuery.toLowerCase(searchQuery)) && (  
                    <MovieCard movie={movie} key={movie.id} />
                )
            ))}
            </div>
        </div>
    )
}
export default Home;
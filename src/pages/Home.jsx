import MovieCard from "../component/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies, searchMovies } from "/services/api"; 

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            } catch (err) {
                console.error("Error fetching popular movies:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadPopularMovies();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault(); 

        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const searchResults = await searchMovies(searchQuery);
            setMovies(searchResults);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Failed to search movies");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for Movie"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </form>

            {error && <p className="error-message">Error: {error}</p>}

            {loading ? (
                <div className="loading">Loading movies...</div>
            ) : (
                <div className="movie-grid">
                    {movies.length === 0 ? (
                        <p>No movies found.</p>
                    ) : (
                        movies.map((movie) => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default Home;

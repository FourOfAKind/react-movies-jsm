import Search from "./components/Search.jsx";
import {useEffect, useState} from "react";
import Spinner from "./components/Spinner.jsx";
import Movie from "./components/Movie.jsx";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3/";
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${TMDB_API_KEY}`
    }
}

const App = () => {
    const[searchTerm, setSearchTerm] = useState("");
    const[errorMessage, setErrorMessage] = useState("");
    const[movies, setMovies] = useState([]);
    const[isLoading, setIsLoading] = useState(true);

    const fetchMovies = async () => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = `${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
            const response = await fetch(endpoint, TMDB_API_OPTIONS);
            if (!response.ok) {
                console.log(`Failed to fetch movies. ${response.statusText}`);
            } else {
                const data = await response.json();
                if(data.Response === "False") {
                    setErrorMessage(data.Error || "Failed to fetch movies.");
                    setMovies([]);
                }
                setMovies(data.results || []);
            }
        } catch (e) {
            setErrorMessage(`Error fetching movies: ${e.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [])
    return (
        <main>
            <div className={"pattern"} />

            <div className={"wrapper"}>
                <header>
                    <img src={"./hero-img.png"} alt={"Hero"}/>
                    <h1>Find <span className={"text-gradient"}>Movies</span> that you&#39;ll love</h1>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </header>

                <section className={"all-movies"}>
                    <h2 className={"mt-[20px]"}>All Movies</h2>
                    {isLoading ? (
                     <Spinner />
                    ) : errorMessage ? (
                        <p className={"text-white"}>{errorMessage}</p>
                    ) : (
                        <ul>
                            {movies.map((movie) => (
                                <Movie key={movie.id} movie={movie}/>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}
export default App

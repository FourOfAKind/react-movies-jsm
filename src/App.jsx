import {useEffect, useState} from "react";
import {useDebounce} from "react-use";
import {getTrendingMovies, updateSearchCount} from "./appwrite.js"
import Search from "./components/Search.jsx";
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
    const[movieList, setMovieList] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[trendingMovies, setTrendingMovies] = useState([]);
    const[debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 750, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage("");

        try {
            const endpoint = (query ? `${TMDB_API_BASE_URL}/search/movie?include_adult=false&query=${encodeURIComponent(query)}` : `${TMDB_API_BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=false`);
            const response = await fetch(endpoint, TMDB_API_OPTIONS);
            if (!response.ok) {
                console.log(`Failed to fetch movies. ${response.statusText}`);
            } else {
                const data = await response.json();
                if(data.Response === "False") {
                    setErrorMessage(data.Error || "Failed to fetch movies.");
                    setMovieList([]);
                }
                setMovieList(data.results || []);

                if (query && data.results.length > 0) {
                    await updateSearchCount(data.results[0]);
                }
            }
        } catch (e) {
            setErrorMessage(`Error fetching movies: ${e.message}`);
        }
        finally {
            setIsLoading(false);
        }
    }
    const fetchTrendingMovies = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovies(movies);
        } catch (e) {
            console.log(`Error rendering trending movies: ${e.message}`);
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        fetchTrendingMovies();
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
                {trendingMovies.length > 0 && (
                    <section className={"trending"}>
                        <h2>Trending Movies</h2>
                        <ul>
                            {trendingMovies.map((movie, index) => (
                                <li key={movie.$id}>
                                    <p>{index+1}</p>
                                    <img src={movie.poster_url} />
                                </li>

                            ))}
                        </ul>
                    </section>
                )
                }
                <section className={"all-movies"}>
                    <h2 className={"mt-[20px]"}>All Movies</h2>
                    {isLoading ? (
                     <Spinner />
                    ) : errorMessage ? (
                        <p className={"text-white"}>{errorMessage}</p>
                    ) : (
                        <ul>
                            {movieList.map((movie) => (
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

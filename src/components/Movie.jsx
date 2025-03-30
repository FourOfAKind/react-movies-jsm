// eslint-disable-next-line react/prop-types
const Movie = ({movie:
    { title, vote_average, poster_path, release_date, original_language}}) => {
    return (
        <div className={"movie-card"}>
            <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './No-Poster.png'} alt={title}/>
            <h3 className={"text-xl mt-4"}>{title}</h3>
            <div className={"content"}>
                <img src={"/Rating.svg"} className={"w-5"} />
                <h4 className={"text-gray-300"}>{vote_average ? vote_average.toFixed(1) + "/10" : "N/A"}</h4>
                <span>|</span>
                <h4 className={"text-gray-300"}>{release_date ? release_date.split('-')[0] : "N/A"}</h4>
                <span>|</span>
                <h4 className={"text-gray-300"}>{original_language ? original_language.toUpperCase() : "N/A"}</h4>
            </div>

        </div>
    )
}
export default Movie

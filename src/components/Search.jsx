const Search = ({searchTerm, setSearchTerm}) => {
    return (
        <div className={"text-white text-3xl "}>
            <div className={"search"}>
                <div>
                    <img src={"search.svg"} alt="search" />
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                </div>
            </div>
        </div>
    )
}
export default Search

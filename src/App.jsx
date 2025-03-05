import Search from "./components/Search.jsx";
import {useState} from "react";

const App = () => {
    const[searchTerm, setSearchTerm] = useState("");
    return (
        <main>
            <div className={"pattern"} />

            <div className={"wrapper"}>
                <header>
                    <img src={"./hero-img.png"}/>
                    <h1>Find <span className={"text-gradient"}>Movies</span> that you&#39;ll love</h1>

                </header>
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
        </main>
    )
}
export default App

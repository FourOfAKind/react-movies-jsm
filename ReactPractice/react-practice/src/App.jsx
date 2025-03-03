import { useState, useEffect } from 'react'
import './App.css'

const Card = ({title, rating}) => {
    const [interactions, setInteractions] = useState(0)
    const [hasLiked, setHasLiked] = useState(false);
    useEffect(() => {
        console.log(`${title} has like set to ${hasLiked}`);
    }, [hasLiked]);
    return (
        <div className={"card"} onClick={() => setInteractions(interactions+1)}>
            <h2>{title} - {rating}/5</h2>
            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? "❤️" : "🤍"}
            </button>
            <h2>{interactions ? interactions : null}</h2>
        </div>
    )
}

const App = () => {
  return (
    <div className={"card-container"}>
        <Card title="Test" rating={5}/>
        <Card title="Test2" rating={4}/>
    </div>
  )
}

export default App
import { useState } from 'react'
import './App.css'

const Card = ({title, rating}) => {
    return (
        <div className={"card"}>
            <h2>{title} - {rating}/5</h2>
        </div>
    )
}

const App = () => {
  const [hasLiked, setHasLiked] = useState(false);


  return (
    <div className={"card-container"}>
        <Card title="Test" rating={5}/>
        <Card title="Test2" rating={4}/>
    </div>
  )
}

export default App

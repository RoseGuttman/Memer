import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { LinearProgress } from '@material-ui/core';

function App() {
  const [text, setText] = useState ('')
  const [memes, setMemes] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMemes(){ //Standard API call
    setLoading = (true)
    setMemes([])
    const key = '9xlLC8IbaeMyjqWVgwIHLO1DEmqNMMen'
    let url = 'https://api.giphy.com/v1/gifs/search?'
    url += 'api_key='+key
    url += '&q='+text
    const r = await fetch(url) //needs to be an async function if it has await
    const body = await r.json()
    setMemes(body.data)
    setText('')
    setLoading(false)
  }
  

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField fullWidth label="Search for Memes" variant="outlined"
             value={text} //Allows someone to type
             onChange={e=> setText(e.target.value)} //Records what they've typed
             onKeyPress={e=> {
               if(e.key==='Enter') getMemes()
             }}
          />
          <Button variant="contained" color="primary"
            onClick={getMemes}>
            Search
          </Button>
        </div>
        {loading && <LinearProgress/>}
      </header>

      <div className='memes'>
        {memes.map((meme, i)=> <Meme key ={i} {...meme}/>)}
      </div>
    </div>
  );
}

function Meme({title, images}){
  return <div className="meme">
    <img src={images.fixed_height.url} alt="meme"/>
    <div className="meme-title">{title}</div>
  </div>
}

export default App;

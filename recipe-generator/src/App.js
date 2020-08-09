import React, {useState}from 'react'
import Axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import "./App.css"
import Recipe from './components/Recipe'
import Alert from './components/Alert'

const App = () => {
const [query, setQuery]= useState("")
const[recipes, setRecipes]= useState([])

const[alert, setAlert]= useState("")

const APP_ID = "17a63891";
const APP_KEY = "c4bf2f4189cdeccfd044247c93baad3a";

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const getData = async() => {
        if(query !== ""){
            const result = await Axios.get(url)
            if(!result.data.more){
                return setAlert("Sorry, I Couldn't Find That")
            }

            setRecipes(result.data.hits)
            console.log(result)
            setAlert("")
            setQuery(""); 
        } else {
            setAlert("Sorry Didn't Get That")
        }
        };

        const onChange=(e)=> {
            setQuery(e.target.value)
        }

        const onSubmit = (e) => {
            e.preventDefault()
            getData()
        }

    return (
        <div className="App">
            <h1> Kellie's recipe generator</h1>

            <form className="search-form" onSubmit={onSubmit}>
                {alert !=="" && <Alert alert={alert}/>}
                <input type='text' placeholder='search Food' autoComplete= 'off' onChange={onChange} value={query}/>
                <input type='submit' value="search"/>
            </form>
            <div className="recipes">
              {recipes!==[]&& recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe}/>)}
            </div>
        </div>
    );
};

export default App;

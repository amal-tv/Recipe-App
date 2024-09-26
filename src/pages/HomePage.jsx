import { Heart, Search, Soup } from "lucide-react"

import React, { useEffect, useState } from 'react'
import { RecipeCard } from "../components/RecipeCard"

const APP_ID = import.meta.env.VITE_APP_ID;
const APP_KEY = import.meta.env.VITE_APP_KEY;


export default function HomePage() {

    const [recipe, setRecipe] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRecipes = async (searchQuery) => {
        setLoading(true);
        setRecipe([]);
        try {
            const res = await fetch(`https://api.edamam.com/api/recipes/v2?app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchQuery}&type=public
`)
           const data = await res.json();
           setRecipe(data.hits); 
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {

        fetchRecipes("chicken");


    }, [])
const handleSearchRecipe = (e) =>{
  e.preventDefault();
  fetchRecipes(e.target[0].value);
}

    return (
        <div className='bg-[#faf9fb] p-10 flex-1'>
            <div className='max-w-screen-lg mx-auto'>

                <form onSubmit={handleSearchRecipe}>
                    <label className="input shadow-md flex items-center gap-2">
                        <Search size="24" />
                        <input type="text" className="text-sm md:text-md grow"
                            placeholder="what do you want to cook today" />

                    </label>
                </form>
                <h1 className="font-bold text-3xl md:text-5xl mt-4">Recommended Recipes</h1>
                <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
                    Popular choices
                </p>

                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


                    {/* first recipe */}
                   {!loading && recipe.map(({recipe},idx)=>(
                            <RecipeCard key = {idx} recipe= {recipe} />
                   ))



                   }

                   {loading && 
                   
                         [...Array(9)].map((_,idx)=>(
                            <div  key={idx} className="flex w-60  flex-col gap-4">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>
                         )


                         )
                   }

                </div>
            </div>

        </div>
    )
}

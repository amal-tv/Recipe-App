 import { Heart, Soup } from 'lucide-react'
import React, { useState } from 'react'



const getTwo = (arr) =>{
  return [arr[0],arr[1]];
}
export const RecipeCard = ({recipe}) => {

 const healths = getTwo(recipe.healthLabels);
 const [isFavorites,setIsFavorites] = useState(localStorage.getItem('favorites')?.includes(recipe.label));


 const addToFavorites = ()=>{
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isRecipeAlreadyInFavorites = favorites.some((fav)=> fav.label === recipe.label);
  
  if(isRecipeAlreadyInFavorites){
    favorites = favorites.filter((fav)=> fav.label !== recipe.label);
    setIsFavorites(false);
  }else{
    favorites.push(recipe);
    setIsFavorites(true);
  }

  localStorage.setItem('favorites',JSON.stringify(favorites));
}
  return (
   
                
    <div className="flex flex-col rounded-md bg-[#f2d4f7] overflow-hidden relative">
    <a href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} className="relative h-32"
    target="_blank">
 
 <div className='skelton absolute inset-0'/>
         <img src={recipe.image} alt="recipe.jpg"
         className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
         onLoad={(e)=>{
          e.currentTarget.style.opacity = 1;
          e.currentTarget.previousElementSibling.style.display = "none";
         }}/>
         <div className="absolute bottom-2 left-2  bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm no-navigate">
             <Soup size="16"/> {recipe.yield} servings

         </div>
               
           <div className="absolute top-1 right-2 rounded-full   bg-white cursor-pointer"
           onClick={(e)=>{
            e.preventDefault();
            addToFavorites();
           }}>
            {isFavorites ?<Heart size = "20" className="fill-red-500 text-red-500 p-[3px]"/> : <Heart size = "20" className="hover:fill-red-500 hover:text-red-500 p-[3px]"/>}

           </div>

    </a>

    <div className="flex mt-1">
     <p>{recipe.label}</p>
    </div>


       <p className="my-2">{recipe.cuisineType[0].charAt(0).toUpperCase() + recipe.cuisineType[0].slice(1)} Kitchen </p>
 <div className="flex gap-2 mt-auto">
              
             {healths.map((health,idx)=>(
               
               <div key={idx} className="flex gap-1 bg-[#d6f497] items-center p-2 rounded-md">
                 <Heart size={"16"} />

               <span className="text-sm tracking-tighter font-semibold">{health}</span>
           </div>
             ))

              } 

          </div>
 </div>



  )
}

const elList=document.querySelector(".film__list");
const elTemplate=document.querySelector("#film__template").content;
const elSelect=document.querySelector(".film__select");
const elForm=document.querySelector(".form");

const renderGenre=(array)=>{
    const genres=[];


    array.forEach(film=>{
        film.genres.forEach(genre=>{
            if(!genres.includes(genre)){
                genres.push(genre)
            }
        })
    })
    return genres;
}


const pushToSelect=(genres,element)=>{
    element.innerHTML=null;
    genres.forEach(genre=>{
        var newOption=document.createElement("option");
        newOption.value=genre;
        newOption.textContent=genre;

        element.appendChild(newOption);
    })
}
pushToSelect(renderGenre(films),elSelect)



const addTime=(time)=>{

    const date=new Date(time);
    const day=String(date.getDate()).padStart(2,0);
    const month=String(date.getMonth()+1).padStart(2,0);
    const year=date.getFullYear();

    return day+"."+month+"."+year;
}

const renderFilm=(array,element)=>{
    element.innerHTML=null

    array.forEach((film)=>{

        const filmTemplate=elTemplate.cloneNode(true);


        filmTemplate.querySelector(".film__title").textContent=film.title;
        filmTemplate.querySelector(".film__img").src=film.poster;
        filmTemplate.querySelector(".film__text").textContent=film.overview;
        filmTemplate.querySelector(".film__time").textContent=addTime(film.release_date);
        filmTemplate.querySelector(".film__second__list").textContent=film.genres;


        element.appendChild(filmTemplate)
    })
}

renderFilm(films,elList)


elForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();

    const secondArray=[];

    films.forEach((film)=>{
        if(film.genres.includes(elSelect.value)){
            secondArray.push(film);
        }
    })
    renderFilm(secondArray,elList);
    console.log(secondArray);

});

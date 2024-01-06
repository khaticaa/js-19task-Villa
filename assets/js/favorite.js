let id=new URLSearchParams(window.location.search).get("id");
const favcard=document.querySelector(".favoritediv")

fetch(`http://localhost:3000/favorites/`)
.then(res=>res.json())
.then(data=>{
  data.forEach(element => {
    favcard.innerHTML+=`
    <div class="s3bot">
    <div class="img">
        <img src="${element.image}" alt="">
    </div>
    <div class="s3bottext">
        <span>${element.description}</span>
        <h4>${element.name}</h4>
        <div class="crudfav">
      <button onclick="deleteCard(${element.id})">Delete</button>
        </div>
            
    `
  });
})

function deleteCard(id){
    axios.delete(`http://localhost:3000/favorites/${id}`)
}


let topbtn = document.querySelector('.topbtn');

topbtn.addEventListener('click', () => {
    window.scrollTo({
        top:0 ,
        behavior: "smooth"
    })
})

let copyArr = [];
let s3bottom = document.querySelector(".s3bottom");
let filteredArr = [];
let searchInput = document.querySelector(".search");
let maxlength = 5;

async function getAllCards(){

let res = await axios("http://localhost:3000/data");
let data = await res.data;
copyArr = data;
s3bottom.innerHTML = "";
filteredArr= filteredArr.length || searchInput.value ? filteredArr : data;
filteredArr.slice(0, maxlength).forEach((element) => {
    s3bottom.innerHTML += `
    <div class="s3bot">
    <div class="img">
        <img src="${element.image}" alt="">
    </div>
    <div class="s3bottext">
        <span>${element.description}</span>
        <h4>${element.name}</h4>
        <div class="Crud">
      
        <button onclick="DeleteButton(${element.id})">Delete</button>
        <button onclick="UpdateButton(${element.id})">Update</button>
        <i onclick="addFavorite(${element.id} , this)" class=" bi-heart-fill"></i> 
        </div>
    </div>
</div>
    
    `;
});
}

getAllCards();

// ----------Delete------------------- 
function DeleteButton(id){
    axios.delete(`http://localhost:3000/data/${id}`);
    window.location.reload();
}

// ---------Uptade----------------
function UpdateButton(id){
    window.location = `./update.html?id=${id}`;
}


// ---------------search------------
searchInput.addEventListener("input", function (e) {
    filteredArr = copyArr;
    filteredArr = filteredArr.filter((element) =>
      element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    );
    getAllCards();
  });
  
//  ferqi nedir muellim??
// searchInput.addEventListener("input", function (e) {
//     filteredArr = copyArr.filter((element) =>
//         element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
//     );
//     getAllCards();
// });


// -------favorites------------------------
function addFavorite(id, heart) {
    axios.get(`http://localhost:3000/data/${id}`).then((res) => {
      axios.post(`http://localhost:3000/favorites`, res.data);
      axios.post(`./favorite.html`, res.data);
      heart.style.color = "red";
  
      window.location = `./favorite.html?id=${id}`;
    });
  }
  
  getAllCards();



//   document.getElementById('toggleMenu').addEventListener('click', function () {
//     const menuul = document.querySelector('.menuul');
//     menuul.style.display = menuul.style.display === 'none' ? 'block' : 'none';
// });


//menu
// const menu = document.querySelector("");

// let lists = document.querySelector(".lists");
// menu.addEventListener('click', () => {
//     if (lists.style.height === "0px") {
//       lists.style.display = "block";
//       lists.style.height = lists.scrollHeight + "px";
//     } else {
//       lists.style.height = "0";
//       setTimeout(() => {
//         lists.style.display = "none";
//       }, 500);
//   }
// }
// );


document.getElementById('click').addEventListener('click', function () {
    const menuList = document.getElementById('menuList');
    menuList.classList.toggle('show-menu');
});

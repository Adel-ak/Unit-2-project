/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

let notFound = [];// this array will hold whats not displied

//global variables 
const listUl = document.querySelector('.student-list');
const studentLi = document.querySelectorAll('.student-item');
for(let i = 0; i < studentLi.length; i++){
   studentLi[i].classList.add('show');
}
const studentDiv = document.querySelector('.page');
//

//Search button on the main page
const headerDiv = document.querySelector('.page-header');
const buttonSpan = document.createElement('span');
buttonSpan.className = 'student-search';
buttonSpan.innerHTML = `<input  type="text" placeholder="Search for students..." onkeyup="search();">
                  <button type="submit" name="submit" value="submit">Search</button>`;
headerDiv.appendChild(buttonSpan);
//

//message for when no result is found, added to the students <ul> in the page and its display is set to "none"
const noMatchLi = document.createElement('li');
noMatchLi.className = 'no-match';
const noMatchText = document.createElement('h1');
noMatchText.textContent = 'Sorry No Match Found......';
noMatchLi.appendChild(noMatchText);
noMatchLi.style.display = 'none';
listUl.appendChild(noMatchLi);
//


//function repsonable for
const search = () => {
   const removePagination = studentDiv.lastElementChild;
   const searchInput = document.querySelector('.student-search input');
   const studentNames = document.querySelectorAll('.student-item h3');
   notFound = [];//sets array empty
   for(let i = 0; i < studentLi.length; i++){
      //checks if input value if found in studentNames
      if(studentNames[i].textContent.includes(searchInput.value)){
         const print = studentLi[i];
         print.style.display = '';
         studentLi[i].classList.add('show');
      }
      //checks if input value is not found in studentNames
      if(!studentNames[i].textContent.includes(searchInput.value)){
         const notPrint = studentLi[i];
         notPrint.style.display = 'none';
         studentLi[i].classList.remove('show');
         notFound.push(notPrint);//pushing whats not displied into notFound array 
      }
   }
   /***
   checks if the array check length is equal to studentNames length,
   if its equal then it will diplay noMatchLi because no students is found 
   ***/
   if(notFound.length === studentNames.length){
      noMatchLi.style.display = '';
   }else{
      noMatchLi.style.display = 'none';
   }
   studentDiv.removeChild(removePagination);//removes Pagination div
   appendPageLinks();//adds new Pagination div once more with the correct amount of links
   
}
//

//event listener added to div with the class "page-header"
headerDiv.addEventListener('click', (e) => {
   const button = e.target;
   //checks if the button is clicked
   if(button.tagName === 'BUTTON'){
      search();
   } 
});
//

// 
const appendPageLinks = (list) => {
   //Pagination added to the main div checks for <li>'s with the class 'show' to determine how much <a> links is needed
   const liShow = document.querySelectorAll('.show')
   const amountPerPage = Math.ceil(liShow.length / 10) - 1;
   const divPagination = document.createElement('div');
   const ulPagination = document.createElement('ul');
   divPagination.className = 'pagination';
   for(let i = 1; i <= amountPerPage +1; i++){  
     ulPagination.innerHTML += `<li><a>${i}</a></li>`; 
   }
   divPagination.appendChild(ulPagination);
   studentDiv.appendChild(divPagination);
   //

   //event listener added to ulPagination links and checks clicks for <a> link
   ulPagination.addEventListener("click", (e) => {
      const currentActive = document.getElementsByClassName("active");
      if(e.target.tagName === 'A'){
         //removes active class from previs <a> links
         for(var i = 0; i < currentActive.length; i++){
            currentActive[i].className = " ";
         }
         e.target.className = "active";
      } 
   });
   return divPagination
}
//

//
const showPage = (list) => {
/*** 
Create the `showPage` function to hide all of the items in the 
list except for the ten you want to show.

Pro Tips: 
   - Keep in mind that with a list of 54 students, the last page 
      will only display four.
   - Remember that the first student has an index of 0.
   - Remember that a function `parameter` goes in the parens when 
   you initially define the function, and it acts as a variable 
   or a placeholder to represent the actual function `argument` 
   that will be passed into the parens later when you call or 
   "invoke" the function 
Loop over items in the list parameter
-- If the index of a list item is >= the index of the first
item that should be shown on the page
-- && the list item index is <= the index of the last item
that should be shown on the page, show it
***/
}
//

window.onload = appendPageLinks();//adds the frist Pagination links when page is opened
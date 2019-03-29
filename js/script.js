/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//Global variables (used by multi functions)
const studentDiv = document.querySelector('.page');
const headerDiv = document.querySelector('.page-header');
const ulPagination = document.createElement('ul');
const studentsLi = document.querySelectorAll('.student-item');
let pageNumber = 1;
let displayed = studentsLi;
let notDisplayed = []; //this array will hold the list which is not displayed
let noMatchLi; //this variable holds the message that will diplay when no match is found
let amountPerPage; //this variable holds a number which will be used to create the max amount of <a> links 
//


//object which holds all the functions
const run = {
    //This function itterates through the student list and display only 10 per page(eg 1 to 10,30 to 40), even if the list is under 10
    showPage: (list, pageNum) => {
        let startIndex = (10 * pageNum) - 10; //first index of list
        let endIndex = (10 * pageNum) - 1; //last index of list
        for (let i = 0; i < list.length; i++) {
            if (i >= startIndex && i <= endIndex) {
                list[i].style.display = ''; //list that will be shown
            } else {
                list[i].style.display = 'none'; //list that will be not shown
            }
        }
    },
    //This function adds Pagination to the main div
    appendPageLinks: (list) => {
        amountPerPage = Math.ceil(list.length / 10); //set the amount of PerPage
        const divPagination = document.createElement('div');
        divPagination.className = 'pagination';
        for (let i = 1; i <= amountPerPage; i++) {
            ulPagination.innerHTML += `<li><a>${i}</a></li>`; //amount of pagination links to be added to the page
        }
        divPagination.appendChild(ulPagination);
        studentDiv.appendChild(divPagination);
        //event listener added to div with the class "page-header"
        ulPagination.addEventListener("click", (e) => {
            const currentActive = document.getElementsByClassName("active"); //holds the <a> links which were clicked
            //checks if the <a> tags is clicked
            if (e.target.tagName === 'A') {
                //removes active class from previous <a> links
                for (var i = 0; i < currentActive.length; i++) {
                    currentActive[i].className = "";
                }
                //adds the active class to the clicked <a> link and passes its number to the pageNumber to show the selected page
                e.target.className = "active";
                pageNumber = e.target.textContent; //page number is set to the number of the clicked link to go to the next/previous page
                run['showPage'](displayed, pageNumber); //showPage runs after the new page number is selected
            }
        });
        //
    },
    //this function is repsonable for searching the students
    search: () => {
        pageNumber = 1; //pageNumber set back to '1' so the frist page is always selected after each search
        const searchInput = document.querySelector('input');
        const studentsNames = document.querySelectorAll('h3');
        const a = document.getElementsByTagName('a');
        notDisplayed = []; //sets array empty
        displayed = []; //sets displayed into an empty array

        for (let i = 0; i < studentsLi.length; i++) {
            //checks if input value is found in studentsNames if so set to studentsLi diplay to diplay
            if (studentsNames[i].textContent.includes(searchInput.value.toLowerCase())) {
                studentsLi[i].style.display = '';
                displayed.push(studentsLi[i]); //pushing whats displayed into displayed array to find out whats the new amount of the list 
                amountPerPage = Math.ceil(displayed.length / 10); //set the new amount PerPage  
                //checks if input value is not found in studentsNames if so set to studentsLi diplay to none
            } else if (!studentsNames[i].textContent.includes(searchInput.value.toLowerCase())) {
                studentsLi[i].style.display = 'none';
                notDisplayed.push(studentsLi[i]); //pushing whats not displayed into notFound array (to be used to check if noMatchLi is needed to be display by checking 'notDisplayed.length === studentsNames.length')
            }
        }

        //checks if the array notDisplayed length equal to studentsNames length set diplay noMatchLi to diplay because no students is found 
        if (notDisplayed.length === studentsNames.length) {
            noMatchLi.style.display = '';
        } else if (notDisplayed.length !== studentsNames.length) {
            noMatchLi.style.display = 'none';
        }

        //checks if diplied list less then or equal 10 if true set the diplay for Pagination to none, no Pagination needed max amount of list is 10 
        if (displayed.length <= 10) {
            ulPagination.style.display = 'none';
        } else {
            ulPagination.style.display = '';
        }

        //checks if <a> links are more then amountPerPage,if ture set display of empty link to 'none'
        for (let j = 0; j < a.length; j++) {
            const off = a[j].parentNode;
            if (j >= amountPerPage) {
                off.style.display = 'none';
                a[j].className = "";
            } else if (j <= amountPerPage) {
                off.style.display = '';
                a[j].className = "";
            }
        }

        run['showPage'](displayed, pageNumber); //after each search it will display to page 1 with the new list from the resualt is searching 
    },
    //function that holds functions,Search button and noMatchLi
    startUp: () => {
        //Search button on the main page
        const buttonSpan = document.createElement('span');
        buttonSpan.className = 'student-search';
        //input is set to onClick 
        buttonSpan.innerHTML = `<input  type="text" placeholder="Search for students..." onkeyup="run['search']();">
                              <button type="submit" name="submit" value="submit">Search</button>`;
        headerDiv.appendChild(buttonSpan);
        //message for when no result is found, added to the students <ul> in the page and its display is set to "none"
        const listUl = document.querySelector('.student-list');
        noMatchLi = document.createElement('li');
        noMatchLi.className = 'no-match';
        const noMatchText = document.createElement('h1');
        noMatchText.textContent = 'Sorry No Match Found......';
        noMatchLi.appendChild(noMatchText);
        noMatchLi.style.display = 'none';
        listUl.appendChild(noMatchLi);
        
        run['appendPageLinks'](displayed);
        run['showPage'](displayed, pageNumber);
    }
};

//event listener added to div with the class "page-header" which will listen for clicks from a button.
headerDiv.addEventListener('click', (e) => {
    //checks if the button is clicked
    if (e.target.tagName === 'BUTTON') {
        run['search']();
    }
});

window.onload = run['startUp'](); //starts functions and adds serch buttuon/noMatchLi when window is opened
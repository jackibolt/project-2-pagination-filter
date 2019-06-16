/******************************************
Treehouse Techdegree: Jacki Bolt
FSJS project 2 - List Filter and Pagination
******************************************/
   

// global variables
const pageDiv = document.querySelector('.page');
const fullStudentUL = document.querySelector('.student-list');
const studentProfileList = document.querySelectorAll('.student-item');
const displayPerPage = 10;
let pageNo = 1;

// FUNCTION limits display to only specified number of profiles // 
const showPage = (list,page) => {

   const firstIndex = (page-1) * displayPerPage;
   const lastIndex = firstIndex + 9;

   for (let i=0; i<list.length; i+=1) {
      //shows profiles with index numbers within the specified range, hides remainders
      if (i>=firstIndex && i<=lastIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// shows first set of profiles on page load
showPage(studentProfileList, pageNo);



// FUNCTION to load search bar //
const showSearchBar = () => {
   const header = document.querySelector('.page-header');
   const searchDiv = document.createElement('div');
   searchDiv.className = 'student-search';
   header.appendChild(searchDiv);

   let input = document.createElement('input');
   input.placeholder = 'Search for students...';
   searchDiv.appendChild(input);
   const button = document.createElement('button');
   button.textContent = 'Search';
   searchDiv.appendChild(button);
}
// shows search bar
showSearchBar();


// FUNCTION to create page links and adds functionality //
const appendPageLinks = (list) => {
   const pagination = document.querySelector('.pagination');
   if(pagination){
      pagination.remove();
   }

   // calculates how many page links based on argument passed into the function / rounds up
   const numOfButtons = Math.ceil(list.length / displayPerPage);

   // creates div
   let buttonsDiv = document.createElement('div');
   buttonsDiv.className = 'pagination';
   pageDiv.appendChild(buttonsDiv);

   // creates ul 
   let buttonsUL = document.createElement('ul');
   buttonsDiv.appendChild(buttonsUL);

   // creates li for each page, according to number of links needed
   for (let i=0; i<numOfButtons; i+=1) {
      let pageLI = document.createElement('li');
      let pageLinks = document.createElement('a');
      // index starts at zero, so +1 for text content
      pageLinks.textContent = i + 1;
      buttonsUL.appendChild(pageLI);
      pageLI.appendChild(pageLinks);
   }

   //adds event listener to each individual page link + add/remove active class
   const links = document.querySelectorAll('a');
   for (let i=0; i<links.length; i+=1) {
      links[i].addEventListener('click', () => {
         //runs showPage function with the link[i] equal to the button's text content, and the page number passed to the function
         showPage(studentProfileList, i+1);
         for (let i=0; i<links.length; i+=1){
            links[i].classList.remove('active');
         }
         event.target.className = 'active';
      })
   }
}

// runs the function, which includes the showPage function
appendPageLinks(studentProfileList);



// FUNCTION to run search //

const searchButton = document.querySelector('button');
const runSearch = (list) => {

   let query = document.querySelector('input').value.toLowerCase();

   const studentNames = document.querySelectorAll('.student-details h3');
   // array to store search results
   const searchResults = [];

   for (let i=0; i<list.length; i+=1) {
      // hide all profiles
      list[i].style.display = 'none';

      const indName = (studentNames[i].textContent);
      // test if search matches results
      if (indName.includes(query)) {
         searchResults.push(list[i]);
      } 
   }
   // show search results, add page links
   showPage(searchResults, pageNo);
   appendPageLinks(searchResults);

   // add no results text
   if (searchResults.length === 0) {
      const noResultsDiv = document.createElement('div');
      pageDiv.appendChild(noResultsDiv);
      const noResultsMessage = document.createElement('p');
      noResultsMessage.textContent = 'Sorry, no students with that name';
      noResultsDiv.appendChild(noResultsMessage);
   }
}

// event listeners to run search function
const input = document.querySelector('input');
input.addEventListener('keyup', () => {
   runSearch(studentProfileList);
});
searchButton.addEventListener('click', () => {
   runSearch(studentProfileList);
})
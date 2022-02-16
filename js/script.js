'use strict';
<<<<<<< HEAD

document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
=======
/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
*/

const titleClickHandler = function(event){
    console.log('Link was clicked!');
    console.log(event);
  
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  
    /* add class 'active' to the clicked link */
  
    /* remove class 'active' from all articles */
  
    /* get 'href' attribute from the clicked link */
  
    /* find the correct article using the selector (value of 'href' attribute) */
  
    /* add class 'active' to the correct article */
  }
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
>>>>>>> 4643c5766c6030e141b1708613a3cf13cd031ece

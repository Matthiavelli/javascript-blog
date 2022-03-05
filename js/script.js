{
  'use strict';

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle: ', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };


  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagSelector = '.post-tags .list';

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){
    console.log('customSelector: ', customSelector);

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for(let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');
      console.log('articleId: ', articleId);

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */
      console.log('articleTitle: ', articleTitle);

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML: ' , linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
      console.log('html' , html);
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagSelector);
      console.log('titleList: ', titleList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('articleTags: ',articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('articleTagsArray: ', articleTagsArray);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log('tag: ', tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#' + articleTags + '"><span>'+ titleList +'</span></a></li>';
        console.log('linkHTML: ', linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
      }

      /* END LOOP: for each tag */
      titleList.innerHTML = html;
    }
    /* insert HTML of all the links into the tags wrapper */
    const links = document.querySelectorAll('.post-tags ul');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    /* END LOOP: for every article: */
  }

  generateTags();

  // eslint-disable-next-line no-inner-declarations
  /*
  function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href: ', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('tag: ', tag);

    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
    console.log('tagLinks: ', tagLinks);

    /* START LOOP: for each active tag link */
    for(let activeTag of tagLinks){
      console.log('activeTag: ', activeTag)

      /* remove class active */
      activeTag.classList.remove('active');
    }  
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(href);
    console.log('tagLinks: ', tagLinks);

    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){
      console.log('tagLink: ', tagLink);

      /* add class active */
      tagLink.classList.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags(){
    /* find all links to tags */
    const tags = document.querySelectorAll(tagLinks);
    /* START LOOP: for each link */
    for(let link of tagLinks){
      console.log('link: ', link);
      /* add tagClickHandler as event listener for that link */
       tagLinks.getElementById(link).addEventListener("click", tagClickHandler);
    }   
    /* END LOOP: for each link */
  }

  addClickListenersToTags();
}

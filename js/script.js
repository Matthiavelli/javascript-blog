{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML),
  };

  /* OPTIONS */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optAuthorsListSelector = '.authors.list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  /* TITLE CLICK HANDLER */

  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };

  /* GENERATE TITLE LINKS */

  // eslint-disable-next-line no-inner-declarations
  function generateTitleLinks(customSelector = ''){

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';

    for(let article of articles){

      /* get the article id */
      const articleId = article.getAttribute('id');

      /* find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      /* get the title from the title element */

      /* create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();

  /* TAGS COUNT */

  // eslint-disable-next-line no-inner-declarations
  function calculateTagsParams(tags) {
    const params =  { max: 0, min: 99999 };
    for(let tag in tags) {
      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  // eslint-disable-next-line no-inner-declarations
  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  }

  /* GENERATE TAGS */

  // eslint-disable-next-line no-inner-declarations
  function generateTags(){
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){

        /* generate HTML of the link */
        const linkHTMLData = {id: tag, title: tag};
        const linkHTML = templates.tagLink(linkHTMLData);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags[tag]) {

          /* [NEW] add generated code to array allTags */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

      /* END LOOP: for each tag */
      }

      titleList.innerHTML = html;

      /* insert HTML of all the links into the tags wrapper */
      const links = document.querySelectorAll('.list-horizontal a');

      for(let link of links){
        link.addEventListener('click', tagClickHandler);
      }
    /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);

    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */

      // const tagLinkHTML = '<li><a href="#tag-' + tag + '"class="' + calculateTagClass(allTags[tag], tagsParams) + '">' + tag + '' + '</a> ('+ allTags[tag] +') </li>';

      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    /* [NEW] END LOOP: for each tag in allTags: */
    }


    /* [NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  generateTags();

  /* TAG CLICK HANDLER */

  // eslint-disable-next-line no-inner-declarations
  function tagClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('link was clicked!');

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for(let activeTag of activeTags){

      /* remove class active */
      activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for(let tagLink of tagLinks){

      /* add class active */
      tagLink.classList.add('active');

    /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  /* ADD CLICK LISTENERS TO TAGS */

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToTags(){
    /* find all links to tags */
    const tagsLinks = document.querySelectorAll('post-tags a');
    /* START LOOP: for each link */
    for(let tagsLink of tagsLinks){
      /* add tagClickHandler as event listener for that link */
      tagsLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  /* GENERATE AUTHOR */

  // eslint-disable-next-line no-inner-declarations
  function generateAuthor(){
    /* [NEW] create new variable allAuthors with empty object */
    let allAuthors = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP for every article */
    for(let article of articles) {

      /* make html variable with empty string */
      let html = '';

      /* get author from .data-author attribute */
      const articleAuthor = article.getAttribute('data-author');


      /* generate HTML of the link */
      const linkHTMLData = {id: articleAuthor, title: articleAuthor};
      const authorHTML = templates.authorLink(linkHTMLData);


      /* add generated code to html variable */
      html = html + '' + authorHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors[articleAuthor]) {
        /* [NEW] add generated code to allAuthors array */
        allAuthors[articleAuthor] = 1;
      }
      else {
        allAuthors[articleAuthor]++;
      }

      /* insert HTML of all the links into the tags wrapper */
      const authorName = article.querySelector(optArticleAuthorSelector);
      authorName.innerHTML = html;

      /* END LOOP: for every article */
    }
    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(optAuthorsListSelector);

    /* [NEW] create variable for all links HTML code */
    const allAuthorsData = {authors: []};

    /* [NEW] START LOOP: for each author in allAuthors */
    for(let author in allAuthors){
      /* [NEW] generate code of a link and it to allAuthorsHTML */
      allAuthorsData.allAuthors.push({
        author: author,
        count: allAuthors[author],
      });

      /* [NEW] END LOOP: for each author in allAuthors */
    }
    /* [NEW] add html from allAuthors to authorList */
    authorList.innerHTML = templates.authorsListLink(allAuthorsData);
  }

  generateAuthor();

  /* AUTHOR CLICK HANDLER */

  // eslint-disable-next-line no-inner-declarations
  function authorClickHandler(event){

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" on the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href constant" */
    const author = href.replace('#author-', '');

    /* find all author links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for(let activeAuthor of activeAuthors){

      /* remove class active */
      activeAuthor.classList.remove('active');
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href^="#author-' + href + '"]');

    /* START LOOP: for each found author link */
    for(let authorLink of authorLinks){
      /* add class active */
      authorLink.classList.add('active');
    /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"');
  }

  /* CLICK LISTENER TO AUTHORS */

  // eslint-disable-next-line no-inner-declarations
  function addClickListenersToAuthors(){
    /* find all links to authors */
    const authorsLinks = document.querySelectorAll('.post-author a');
    /* START LOOP: for each link */
    for(let authorLink of authorsLinks){
      /* add AuthorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors();
}

'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The function below is a constructor function. The name is capatalized to help show that it's intended to be a constructor. It's use is to create instances of objects with the same set of properties. 'this' is used to refer to the value contained in the property of this instance of the object. 'rawDataObj' is the raw data containing the information we want to pass into the properties of the new object instance.

function Article (rawDataObj) {
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  articles.push(this);
}

Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // Cloning the article template allows us to keep the attribute associated with the particular class.

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  
  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $newArticle.attr('class', this.title);
  
  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
  We need to fill in:
  1. author name,
  2. author url
  3. article title,
  4. article body, and
  5. publication date. */

  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('.article-body').text(this.body);
  $newArticle.find('time').attr('datetime', this.publishedOn);
  
  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};

rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// DONE: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(element) {
  articles.push(new Article(element));
});

articles.forEach(function(element) {
  $('#articles').append(element.toHtml());
});
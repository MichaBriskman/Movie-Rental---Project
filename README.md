# Movie Rental strore

# Authors
* Name: Micha Briskman

# Technologies
* Client side - React, Node.js, IMDB API
* Server side - Java, Spring
* Server - Tomcat 9.0.73 
* Data Base - SQL

# About
This project is a Movie rental store. </br>
The first page of site lets you choose a movie. </br>
* The search allows using a search string, by genre (select multi option), by release date (select option) 
* and by genre and release date combined.
* The primary search is by the query string, so if searched by the query string and by something else the search will be
* done by the query string.
* There is an ability to browse for more result pages.
* The website records every search and build a history list of searches that allow the user to perform previous 
* search in one click. 
* The user is able to empty the search history at once.
* The search results allows adding movies to a shopping cart handled by the Spring server. 
* A movie cannot be added more than once to the cart. 
* The number of items in shopping cart appears in the search page.
* The cart page allows to see all cart contents and the total cost of purchase. 
* Each item is presented with basic information (image, title, release date, price). 
* There is assign a fixed price of 3.99 for each item. 
* The page allows removing items one by one from the cart and emptying the cart at once.
* The checkout page displays a form allowing customers to enter their information, and completes their purchase. 
* Upon submission, the purchase is saved in the database, and the cart resets to be empty while returning to the home page.
* There are navigation links/buttons between pages. 
* If the cart is empty, the cart and checkout pages show that the cart is empty.
* The shopping cart is stored in the user session, using Spring session beans.
* 
---------------------


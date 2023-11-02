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
There are 3 main pages to the site: The homePage, The cartPage and the checkoutPage.</br>
When you first enter the site a form appears and lets you choose a movie by a search string, by a genre (select multi option), by release date (select option) 
and by genre and release date combined. </br>
The shopping cart is stored in the user session, using Spring session beans.</br>
![](imgs/HomePage.png)
</br>
Each item is presented with basic information (image, title, release date, price) and there is a fixed price of 3.99 for each item. 
 ![](imgs/moviesShow.png)
 </br>
 There is an ability to browse for more result pages.
 ![](imgs/browsPages.png)
The website records every search and build a history list of searches that allow the user to perform previous search in one click. 
The user is able to empty the search history at once.
![](imgs/showhistory.png)
</br>
After adding a movie to the cart a short message (modal) appears.
![](imgs/modalAddedTocart.png)
The search results allows adding movies to a shopping cart handled by the Spring server.</br>
The cart page allows to see all cart contents and the total cost of purchase. </br>
Each item is presented with basic information (image, title, release date, price) and there is a fixed price of 3.99 for each item. </br>
The page allows removing items one by one from the cart and emptying the cart at once.
![](imgs/cartPage.png)
</br>
The checkout page displays a form allowing customers to enter their information, and completes their purchase. 
Upon submission, the purchase is saved in the database, and the cart resets to be empty while returning to the home page.
![](imgs/formToCheckout.png)
There are navigation links/buttons between pages.
![](imgs/buttons.png)
The database is a SQL database, where the id of the user that rents the movie is his email.
  


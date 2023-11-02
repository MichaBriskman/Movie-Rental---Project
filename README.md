[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/7Tmn2VQK)

# Authors
* Name: Micha Briskman  Email: michabri@edu.hac.ac.il 
* Name: Shlomo Gulayev Email: shlomogu@edu.hac.ac.il 

# Explanations
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


# Initializing the template

In order to initialize the project make sure to:

1. When you open the project, if intelliJ propose to "Load Maven Project" do it. You can later reload maven with the "M" icon on the right of the screen, or by right clicking on the pom.xml file and selecting "Maven -> Reload project".
2. You see red lines in the code? Go to File -> Project Structure -> Project Settings -> Project -> SDK -> and choose your Java SDK
3. Still see red stuff? Open the same dialog and click on "Fix" if you see some
4. Edit your configuration "ex4" at the top right. Make sure the "Main class" is set to "hac.DemoApplication" and that Java is set

Everything ok?
1. Run the SQL server as shown in the video (week 6) and create a database named "ex4". The DB credentials are stored in the application.properties file. You may change them if you want.
2. Run the project, you should not see any errors in IntelliJ console

So far the only route you can check is http://localhost:8080/debug/purchases
that returns a list of all purchases in the DB (empty for now).

## Initializing the React client (movie-app)

Open a terminal in *movie-app* and run `npm install` and then `npm start`. You should see the client running on http://localhost:3000.
You can also open another instance of IntelliJ and open the *movie-app* folder as a project. You can then run the client from there.

## Using the provided code to store purchases in the DB

We provide you with ready-to-use code to store purchases in the DB, in order to give you a taste of what Spring can do for you.
Look at the DebugController class. It has a method called "addPurchase" that receives a Purchase object and stores it in the DB.
When you develop your own controller, you must declare the repository member exactly as it is declared in the DebugController class.
Then you can use it to store purchases in the DB (repository.save(purchase)).

## Still have problems? Come to class.

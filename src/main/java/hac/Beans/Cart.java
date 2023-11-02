package hac.Beans;

import org.springframework.stereotype.Component;
import java.io.Serializable;
import java.util.ArrayList;

/**
 * A cart class for recording movie ids in cart.
 */
@Component
public class Cart implements Serializable {
    private ArrayList<Integer> cartMoviesIds;

    /**
     * constructor cart
     */
    public Cart(){
        this.cartMoviesIds = new ArrayList<>();
    }

    /**
     * returning the cart.
     * @return cartMovieIds the cart.
     */
    public ArrayList<Integer> getCart(){
        return cartMoviesIds;
    }

    /**
     * adds the movie id to the cart
     * @param movieId id of the movie
     * @return returns if the cart contains the movie id
     */
    public boolean addMovie(int movieId){
        if (!cartMoviesIds.contains(movieId))
            cartMoviesIds.add(movieId);
        return cartMoviesIds.contains(movieId);
    }

    /**
     * remove the movie id
     * @param movieId id of the movie
     * @return if removed the id from the cart
     */
    public boolean removeMovie(int movieId) {
        return cartMoviesIds.removeIf(id -> id.equals(movieId));
    }

    /**
     * resets the cart
     */
    public void resetCart() {
        cartMoviesIds = new ArrayList<>();
    }

    /**
     * returns the length of the cart
     * @return the length of the cart
     */
    public int getLength()
    {
        return cartMoviesIds.size();
    }
}


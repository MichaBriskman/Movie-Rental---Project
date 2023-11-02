package hac;

import java.util.ArrayList;

import hac.Beans.Cart;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * cart controller class
 */
@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private Cart cart;

    /**
     * Get method of getting the cart,
     * you can check the DB contents by visiting http://localhost:8080/cart/getCart
     * @return the cart array
     */
    @GetMapping("/getCart")
    public ResponseEntity<ArrayList<Integer>> getCart() {
        return ResponseEntity.ok(cart.getCart());
    }

    /**
     * Post method for adding a movie to the cart
     * @param movieId the movie id
     * @return cart array if added successfully, and notFound if not.
     */
    @PostMapping("/addMovie")
    public  ResponseEntity<ArrayList<Integer>> addItem(@RequestParam int movieId) {
        final boolean added = cart.addMovie(movieId);
        if(added)
            return ResponseEntity.ok(cart.getCart());
        return ResponseEntity.notFound().build();
    }
    /**
     * Post method for adding a movie to the cart
     * @param movieId the movie id
     * @return cart array if added successfully, and notFound if not.
     */
    @PostMapping("/removeMovie")
    public ResponseEntity<ArrayList<Integer>> removeItemFromCart(@RequestParam int movieId) {
        final boolean removed = cart.removeMovie(movieId);
        ArrayList<Integer> cartMovies = cart.getCart();
        if (removed)
            return ResponseEntity.ok(cartMovies);
        return ResponseEntity.notFound().build();
    }

    /**
     * post method resets the cart
     * @return the length if succeeded
     */
    @PostMapping("/clearCart")
    public ResponseEntity<Integer> resetCart() {
        cart.resetCart();
        if(cart.getLength()==0)
            return ResponseEntity.ok(cart.getLength());
        return ResponseEntity.notFound().build();
    }

}

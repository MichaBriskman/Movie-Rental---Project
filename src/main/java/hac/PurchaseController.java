package hac;

import hac.repo.Purchase;
import hac.repo.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

/**
 * Purchase controller class using the PurchaseRepository
 */
@RestController
@RequestMapping("/purchase")
public class PurchaseController {
    @Autowired
    private PurchaseRepository repository;


    /**
     * Get method of getting all purchases,
     * you can check the DB contents by visiting http://localhost:8080/purchase/getAllPurchases
     * @return the list of all purchases
     */
    @GetMapping("/getAllPurchases")
    public List<Purchase> showPurchases() {
        return repository.findAll();
    }

    /**
     * post method of adding a purchase to DB
     * @param purchase purchaseRepository
     * @return Purchase saved
     */
    @PostMapping("/addPurchase")
    public Purchase addPurchase(@RequestBody Purchase purchase) {
        return repository.save(purchase);
    }
}
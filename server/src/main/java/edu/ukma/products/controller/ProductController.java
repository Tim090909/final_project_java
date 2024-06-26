package edu.ukma.products.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import edu.ukma.products.EncryptionUtils;
import edu.ukma.products.model.Product;
import edu.ukma.products.model.UpdateAmountRequest;
import edu.ukma.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET all products
    @GetMapping
    public ResponseEntity<String> getAllProducts() {
        List<Product> products = productService.findAllProducts();
        String encryptedResponse = EncryptionUtils.encrypt(convertToJson(products));
        return new ResponseEntity<>(encryptedResponse, HttpStatus.OK);
    }

    // GET products by category
    @GetMapping("/category")
    public ResponseEntity<String> findProductsByCategory(@RequestParam int groupId) {
        List<Product> products = productService.findProductsInCategory(groupId);
        String encryptedResponse = EncryptionUtils.encrypt(convertToJson(products));
        return new ResponseEntity<>(encryptedResponse, HttpStatus.OK);
    }

    // GET total value of products
    @GetMapping("/total-value")
    public ResponseEntity<String> getTotalValueOfProducts() {
        double totalValue = productService.getTotalValueOfProducts();
        String encryptedResponse = EncryptionUtils.encrypt(Double.toString(totalValue));
        return new ResponseEntity<>(encryptedResponse, HttpStatus.OK);
    }

    // GET product by ID
    @GetMapping("/{id}")
    public ResponseEntity<String> getProductById(@PathVariable int id) {
        Product product = productService.findProductById(id);
        if (product != null) {
            String encryptedResponse = EncryptionUtils.encrypt(convertToJson(product));
            return new ResponseEntity<>(encryptedResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // POST create a new product
    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.saveProduct(product);
        String encryptedResponse = EncryptionUtils.encrypt(convertToJson(createdProduct));
        return new ResponseEntity<>(encryptedResponse, HttpStatus.CREATED);
    }

    // PUT update an existing product
    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        if (updatedProduct != null) {
            String encryptedResponse = EncryptionUtils.encrypt(convertToJson(updatedProduct));
            return new ResponseEntity<>(encryptedResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // DELETE delete a product by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Utility method to convert object to JSON string
    private String convertToJson(Object object) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error converting object to JSON", e);
        }
    }
}*/

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<List<Product>>(productService.findAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Product>> findProductsByCategory(@RequestParam int groupId) {
        return new ResponseEntity<>(productService.findProductsInCategory(groupId), HttpStatus.OK);
    }

    @GetMapping("/total-value")
    public ResponseEntity<Double> getTotalValueOfProducts() {
        double totalValue = productService.getTotalValueOfProducts();
        return new ResponseEntity<>(totalValue, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable int id) {
        Product product = productService.findProductById(id);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product createdProduct = productService.saveProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable int id, @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{id}/update-amount")
    public ResponseEntity<Product> updateProductAmount(@PathVariable int id, @RequestBody UpdateAmountRequest request) {
        try {
            Product updatedProduct = productService.updateProductAmount(id, request);
            return ResponseEntity.ok(updatedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable int id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (isDeleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

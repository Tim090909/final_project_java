package edu.ukma.products.controller;


import edu.ukma.products.model.ProductGroup;
import edu.ukma.products.service.ProductGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/groups")
public class  ProductGroupController {
    @Autowired
    private ProductGroupService productGroupService;

    @GetMapping
    public ResponseEntity<List<ProductGroup>> getAllGroups() {
        return new ResponseEntity<List<ProductGroup>>(productGroupService.findAllProductGroups(), HttpStatus.OK);
    }

    @GetMapping("/total-value")
    public ResponseEntity<Double> getTotalValueOfProducts(@RequestParam int groupId) {
        double totalValue = productGroupService.getTotalValueOfProducts(groupId);
        return new ResponseEntity<>(totalValue, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductGroup> getGroupById(@PathVariable int id) {
        ProductGroup group = productGroupService.findProductGroupById(id);
        if (group != null) {
            return new ResponseEntity<>(group, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping
    public ResponseEntity<ProductGroup> createGroup(@RequestBody ProductGroup group) {
        ProductGroup createdGroup = productGroupService.saveProductGroup(group);
        return new ResponseEntity<>(createdGroup, HttpStatus.CREATED);
    }

    @PostMapping("/{id}")
    public ResponseEntity<ProductGroup> updateGroup(@PathVariable int id, @RequestBody ProductGroup group) {
        ProductGroup updatedGroup = productGroupService.updateProductGroup(id, group);
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable int id) {
        productGroupService.deleteProductGroup(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
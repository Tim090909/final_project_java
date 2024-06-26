package edu.ukma.products.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductGroup {
    private int id;
    private String title;
    private String description;

    public ProductGroup(String name, String description) {
        this.title = name;
        this.description = description;
    }
}

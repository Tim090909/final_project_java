package edu.ukma.products.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Product implements Serializable {
    private Integer id;
    private String title;
    private String description;
    private String manufacturer;
    private Integer amount;
    private Double price;
    private int groupId;

    public Product(String title, int amount, double price, String manufacturer, String description, int groupId) {
        this.title = title;
        this.amount = amount;
        this.price = price;
        this.manufacturer = manufacturer;
        this.description = description;
        this.groupId = groupId;
    }
}



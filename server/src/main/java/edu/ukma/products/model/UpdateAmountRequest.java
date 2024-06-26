package edu.ukma.products.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAmountRequest {
    private String action; // "add" or "writeOff"
    private int amount;
}

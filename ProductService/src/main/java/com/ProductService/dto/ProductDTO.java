package com.ProductService.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String name;
    private Double price;
    private String description;
    private Integer stock;
}
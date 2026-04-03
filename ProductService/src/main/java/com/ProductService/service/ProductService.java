package com.ProductService.service;

import com.ProductService.dto.ProductDTO;
import com.ProductService.entity.Product;
import com.ProductService.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository repository;

    public Product create(ProductDTO dto) {
        Product product = new Product(null,
                dto.getName(),
                dto.getPrice(),
                dto.getDescription(),
                dto.getStock());

        return repository.save(product);
    }

    public Product getById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product update(Long id, ProductDTO dto) {
        Product product = getById(id);

        product.setName(dto.getName());
        product.setPrice(dto.getPrice());
        product.setDescription(dto.getDescription());
        product.setStock(dto.getStock());

        return repository.save(product);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
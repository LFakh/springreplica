package com.example.amazonreplica.controller;

import com.example.amazonreplica.model.Product;
import com.example.amazonreplica.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/public")
public class HomeController {

    private final ProductService productService;

    public HomeController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/home")
    public ResponseEntity<Map<String, Object>> getHomePageData() {
        List<Product> featuredProducts = productService.getAllProducts().subList(0, 
                Math.min(6, productService.getAllProducts().size()));
        
        Map<String, Object> response = new HashMap<>();
        response.put("featuredProducts", featuredProducts);
        response.put("categories", productService.getAllCategories());
        
        return ResponseEntity.ok(response);
    }
}
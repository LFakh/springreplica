package com.example.amazonreplica.controller;

import com.example.amazonreplica.dto.AddToCartRequest;
import com.example.amazonreplica.model.Cart;
import com.example.amazonreplica.model.Product;
import com.example.amazonreplica.model.User;
import com.example.amazonreplica.repository.UserRepository;
import com.example.amazonreplica.service.CartService;
import com.example.amazonreplica.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;
    private final ProductService productService;
    private final UserRepository userRepository;

    public CartController(CartService cartService, ProductService productService, UserRepository userRepository) {
        this.cartService = cartService;
        this.productService = productService;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<Cart> getCart() {
        User user = getCurrentUser();
        return cartService.getCartByUserId(user.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public ResponseEntity<Cart> addToCart(@RequestBody AddToCartRequest request) {
        User user = getCurrentUser();
        Product product = productService.getProductById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Cart updatedCart = cartService.addItemToCart(user, product, request.getQuantity());
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable Long productId) {
        User user = getCurrentUser();
        Cart updatedCart = cartService.removeItemFromCart(user, productId);
        return ResponseEntity.ok(updatedCart);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        User user = getCurrentUser();
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
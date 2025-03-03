package com.example.amazonreplica;

import com.example.amazonreplica.model.Cart;
import com.example.amazonreplica.model.Category;
import com.example.amazonreplica.model.Product;
import com.example.amazonreplica.model.User;
import com.example.amazonreplica.repository.CartRepository;
import com.example.amazonreplica.repository.CategoryRepository;
import com.example.amazonreplica.repository.ProductRepository;
import com.example.amazonreplica.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashSet;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final CartRepository cartRepository;

    public DataInitializer(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            CartRepository cartRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public void run(String... args) {
        // Create admin user
        if (!userRepository.existsByUsername("ray")) {
            User adminUser = new User();
            adminUser.setUsername("ray");
            adminUser.setEmail("ray@example.com");
            adminUser.setPassword(passwordEncoder.encode("loco"));
            adminUser.setRoles(new HashSet<>(Collections.singletonList("ADMIN")));
            userRepository.save(adminUser);
            
            Cart adminCart = new Cart();
            adminCart.setUser(adminUser);
            adminCart.setTotalPrice(BigDecimal.ZERO);
            cartRepository.save(adminCart);
        }

        // Create regular user
        if (!userRepository.existsByUsername("nim")) {
            User regularUser = new User();
            regularUser.setUsername("nim");
            regularUser.setEmail("nim@example.com");
            regularUser.setPassword(passwordEncoder.encode("nim"));
            regularUser.setRoles(new HashSet<>(Collections.singletonList("USER")));
            userRepository.save(regularUser);
            
            Cart userCart = new Cart();
            userCart.setUser(regularUser);
            userCart.setTotalPrice(BigDecimal.ZERO);
            cartRepository.save(userCart);
        }

        // Create categories
        if (categoryRepository.count() == 0) {
            Category electronics = new Category();
            electronics.setName("Electronics");
            electronics.setDescription("Electronic devices and gadgets");
            categoryRepository.save(electronics);

            Category clothing = new Category();
            clothing.setName("Clothing");
            clothing.setDescription("Apparel and fashion items");
            categoryRepository.save(clothing);

            Category books = new Category();
            books.setName("Books");
            books.setDescription("Books and literature");
            categoryRepository.save(books);

            // Create products
            if (productRepository.count() == 0) {
                // Electronics products
                Product laptop = new Product();
                laptop.setName("Laptop Pro X");
                laptop.setDescription("High-performance laptop with 16GB RAM and 512GB SSD");
                laptop.setPrice(new BigDecimal("1299.99"));
                laptop.setImageUrl("https://source.unsplash.com/random/300x200?laptop");
                laptop.setStockQuantity(50);
                laptop.setCategory(electronics);
                productRepository.save(laptop);

                Product smartphone = new Product();
                smartphone.setName("Smartphone Ultra");
                smartphone.setDescription("Latest smartphone with 6.7-inch display and 128GB storage");
                smartphone.setPrice(new BigDecimal("899.99"));
                smartphone.setImageUrl("https://source.unsplash.com/random/300x200?smartphone");
                smartphone.setStockQuantity(100);
                smartphone.setCategory(electronics);
                productRepository.save(smartphone);

                // Clothing products
                Product tshirt = new Product();
                tshirt.setName("Cotton T-Shirt");
                tshirt.setDescription("Comfortable 100% cotton t-shirt in various colors");
                tshirt.setPrice(new BigDecimal("19.99"));
                tshirt.setImageUrl("https://source.unsplash.com/random/300x200?tshirt");
                tshirt.setStockQuantity(200);
                tshirt.setCategory(clothing);
                productRepository.save(tshirt);

                Product jeans = new Product();
                jeans.setName("Slim Fit Jeans");
                jeans.setDescription("Classic slim fit jeans for everyday wear");
                jeans.setPrice(new BigDecimal("49.99"));
                jeans.setImageUrl("https://source.unsplash.com/random/300x200?jeans");
                jeans.setStockQuantity(150);
                jeans.setCategory(clothing);
                productRepository.save(jeans);

                // Books products
                Product novel = new Product();
                novel.setName("The Great Adventure");
                novel.setDescription("Bestselling novel about an epic journey");
                novel.setPrice(new BigDecimal("14.99"));
                novel.setImageUrl("https://source.unsplash.com/random/300x200?book");
                novel.setStockQuantity(75);
                novel.setCategory(books);
                productRepository.save(novel);

                Product cookbook = new Product();
                cookbook.setName("Gourmet Cooking");
                cookbook.setDescription("Collection of gourmet recipes from around the world");
                cookbook.setPrice(new BigDecimal("24.99"));
                cookbook.setImageUrl("https://source.unsplash.com/random/300x200?cookbook");
                cookbook.setStockQuantity(60);
                cookbook.setCategory(books);
                productRepository.save(cookbook);
            }
        }
    }
}
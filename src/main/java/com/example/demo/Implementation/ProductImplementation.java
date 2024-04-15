package com.example.demo.Implementation;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.Model.Inventory;
import com.example.demo.Model.Product;
import com.example.demo.Model.Specifications;
import com.example.demo.Repository.CategoryRepository;
import com.example.demo.Repository.InventoryRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Repository.SpecificationsRepository;
import com.example.demo.Service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductImplementation implements ProductService {

    private  final  ProductRepository productRepository;

    private  final CategoryRepository categoryRepository;

    private final InventoryRepository inventoryRepository;

    private final SpecificationsRepository specificationsRepository;

    @Override
    public String productSave(ProductDTO product) {
        try {
            Product newProduct = new Product();
            newProduct.setTitle(product.getTitle());
            newProduct.setDescription(product.getDescription());
            newProduct.setBrand(product.getBrand());
            newProduct.setThumbnail(product.getThumbnail());
            newProduct.setPrice(product.getPrice());
            newProduct.setCategory(categoryRepository.findByCategoryName(product.getCategoryName())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found")));
            Inventory inventory = new Inventory();
            inventory.setQuantity(product.getQuantity());
            inventory.setLocation(product.getLocation());
            inventoryRepository.save(inventory);
            newProduct.setInventory(inventory);
            Product savedProduct = productRepository.save(newProduct);
            Specifications specifications = new Specifications();

            specifications.setProductId(newProduct.getId());
            specifications.setWeight(product.getWeight());
            specifications.setColor(product.getColor());
            specifications.setModelNo(product.getModelNo());
            specifications.setModelName(product.getModelName());
            specifications.setImages(product.getImages());
            specifications.setSpecifications(product.getSpecifications());
            specificationsRepository.save(specifications);

            if (savedProduct != null) {
                return "Product saved successfully ";
            } else {
                return "Product not saved";
            }
        } catch (Exception e) {

            return "Failed to save product " + e.getMessage();
        }

    }

    @Override
    public List<Product> searchProductsByKeyword(String keyword) {
        return productRepository.findByProductName(keyword);
    }

    @Override
    public String addSpecification(Specifications specifications) {
        specificationsRepository.save(specifications);
        return "Success";
    }

    @Override
    public List<ProductDTO> displayProduct() {
        List<Product> products = productRepository.findByDeleted();
        List<ProductDTO> productList = new ArrayList<>();
        System.out.println("product"+products.size());

        for (Product product : products) {

                Specifications specificationsOptional = specificationsRepository.findByProductId(product.getId()).orElseThrow(() -> new RuntimeException("Product does not found"));
                ProductDTO productDTO = new ProductDTO();

                productDTO.setId(product.getId());
                productDTO.setTitle(product.getTitle());
                productDTO.setCategoryName(product.getCategory().getCategoryName());
                productDTO.setDescription(product.getDescription());
                productDTO.setPrice(product.getPrice());
                productDTO.setBrand(product.getBrand());
                productDTO.setThumbnail(product.getThumbnail());
                productDTO.setQuantity(product.getInventory().getQuantity());
                productDTO.setLocation(product.getInventory().getLocation());
                productDTO.setModelNo(specificationsOptional.getModelNo());
                productDTO.setColor(specificationsOptional.getColor());
                productDTO.setWeight(specificationsOptional.getWeight());
                productDTO.setSpecifications(specificationsOptional.getSpecifications());
                productDTO.setImages(specificationsOptional.getImages());
                productDTO.setModelName(specificationsOptional.getModelName());
                productList.add(productDTO);

        }
        return productList;
    }

    @Override
    public ProductDTO displayProductBydId(Integer id) {
        Product product=productRepository.findById(id).orElseThrow(()->new RuntimeException("Product does not exist"));
        Specifications specificationsOptional = specificationsRepository.findByProductId(product.getId()).orElseThrow(() -> new RuntimeException("Product does not found"));
        ProductDTO productDTO = new ProductDTO();
        productDTO.setTitle(product.getTitle());
        productDTO.setCategoryName(product.getCategory().getCategoryName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setQuantity(product.getInventory().getQuantity());
        productDTO.setLocation(product.getInventory().getLocation());
        productDTO.setModelNo(specificationsOptional.getModelNo());
        productDTO.setColor(specificationsOptional.getColor());
        productDTO.setWeight(specificationsOptional.getWeight());
        productDTO.setSpecifications(specificationsOptional.getSpecifications());
        productDTO.setImages(specificationsOptional.getImages());
        productDTO.setModelName(specificationsOptional.getModelName());
        return productDTO;


    }

    @Override
    public String editProduct(Integer id, ProductDTO product) {
        try {
            Product oldproduct = productRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));

            Specifications specifications = specificationsRepository.findByProductId(id)
                    .orElseThrow(() -> new RuntimeException("Specifications not found for product with id: " + id));
            oldproduct.setId(oldproduct.getId());
            oldproduct.setThumbnail(product.getThumbnail());
            oldproduct.setTitle(product.getTitle());
            oldproduct.setDescription(product.getDescription());
            oldproduct.setPrice(product.getPrice());
            oldproduct.setBrand(product.getBrand());
            oldproduct.setCategory(categoryRepository.findByCategoryName(product.getCategoryName())
                    .orElseThrow(() -> new IllegalArgumentException("Category not found")));
            Inventory inventory = inventoryRepository.findByInventoryId(oldproduct.getInventory().getInventoryId());
            inventory.setInventoryId(inventory.getInventoryId());
            inventory.setQuantity(product.getQuantity());
            inventory.setLocation(product.getLocation());
            inventoryRepository.save(inventory);
            productRepository.save(oldproduct);
            specifications.setId(specifications.getId());
            specifications.setProductId(specifications.getProductId());
            specifications.setWeight(product.getWeight());
            specifications.setColor(product.getColor());
            specifications.setModelNo(product.getModelNo());
            specifications.setModelName(product.getModelName());
            specifications.setImages(product.getImages());
            specifications.setSpecifications(product.getSpecifications());
            specificationsRepository.save(specifications);
            return "Product Updated ";
        }catch (Exception e){
            e.printStackTrace();
            return "Failed to update product";
        }

    }

    @Override
    public String deleteProduct(Integer id) {
        Product oldproduct = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
oldproduct.setDeleted(true);
//        Specifications specifications = specificationsRepository.findByProductId(id)
//                .orElseThrow(() -> new RuntimeException("Specifications not found for product with id: " + id));
        productRepository.save(oldproduct);
        return "Deleted Products";
    }
}

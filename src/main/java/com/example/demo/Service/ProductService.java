package com.example.demo.Service;

import com.example.demo.DTO.ProductDTO;
import com.example.demo.DTO.UserDto;
import com.example.demo.Model.Product;
import com.example.demo.Model.Specifications;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    String productSave(ProductDTO product);


    List<Product> searchProductsByKeyword(String keyword);

    String addSpecification(Specifications specifications);

   List<ProductDTO> displayProduct();

    ProductDTO displayProductBydId(Integer id);

    String editProduct(Integer id, ProductDTO product);
    String deleteProduct(Integer id);

}

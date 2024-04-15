package com.example.demo.Repository;

import com.example.demo.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;
import java.util.List;
@Repository
public interface ProductRepository extends JpaRepository<Product,Integer> {

//    @Query(value = "select id,product_name as ProductName,short_des as ShortDesc,price  as Price from product where product_name=:name", nativeQuery = true)
//    productShortDescription findByProductName(@Param("name")String name);
    @Query(value = "select * from product where product_name=:keyword", nativeQuery = true)
    List<Product>findByProductName(@Param("keyword")String keyword);
   // List<Product>  findByProductNameContainingIgnoreCase
    @Query(value = "select * from product where is_deleted =false",nativeQuery = true)
    List<Product>findByDeleted();


//    @Query(value = "select new com.example.demo.DTO.ProductShortDescription(id, product_name, short_des, price)  from product  where product_name=:name")
//    productShortDescription findByProductName(@Param("name")String name);
}

package com.example.demo.Repository;

import com.example.demo.Model.Specifications;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface SpecificationsRepository extends MongoRepository<Specifications,Integer> {
    Optional<Specifications> findByProductId(Integer productId);
}

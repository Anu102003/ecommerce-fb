package com.example.demo.DTO;

import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Data;

@Data
public class OrderItemDTO {
    private Integer quantity;
    private Integer productId;
}





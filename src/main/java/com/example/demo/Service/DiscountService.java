package com.example.demo.Service;

import com.example.demo.DTO.DiscountDTO;
import com.example.demo.DTO.ResponseDTO;
import org.springframework.stereotype.Service;

@Service

public interface DiscountService {
    ResponseDTO addTimeDiscount(DiscountDTO discountDTO);
}

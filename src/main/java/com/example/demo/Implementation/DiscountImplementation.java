package com.example.demo.Implementation;

import com.example.demo.DTO.DiscountDTO;
import com.example.demo.DTO.ResponseDTO;
import com.example.demo.Service.DiscountService;
import org.springframework.stereotype.Service;

@Service
public class DiscountImplementation implements DiscountService {
    @Override
    public ResponseDTO addTimeDiscount(DiscountDTO discountDTO) {
        return  null;
    }
}

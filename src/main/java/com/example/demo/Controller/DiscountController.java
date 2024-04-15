package com.example.demo.Controller;

import com.example.demo.DTO.DiscountDTO;
import com.example.demo.DTO.ResponseDTO;
import com.example.demo.Service.DiscountService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/discount/")
@RequiredArgsConstructor
public class DiscountController {

private final DiscountService discountService;
    @PostMapping("save/product")
    public ResponseDTO addTimeBasedDiscount(@RequestBody DiscountDTO discountDTO){
        return discountService.addTimeDiscount(discountDTO);
    }

}

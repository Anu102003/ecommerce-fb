package com.example.demo.Controller;

import com.example.demo.DTO.OrderDetailsDTO;
import com.example.demo.Service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PostMapping("order")
    public ResponseEntity<String> productDetails(@RequestBody OrderDetailsDTO orderDetails) {
        try {
            String result = orderDetailService.orderDetails(orderDetails);
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to place order " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

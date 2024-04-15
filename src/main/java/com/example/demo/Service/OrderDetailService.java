package com.example.demo.Service;

import com.example.demo.DTO.OrderDetailsDTO;
import org.springframework.stereotype.Service;

@Service
public interface OrderDetailService  {


    String orderDetails(OrderDetailsDTO orderDetails);
}

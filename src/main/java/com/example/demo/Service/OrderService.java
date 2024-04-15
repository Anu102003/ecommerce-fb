package com.example.demo.Service;

import com.example.demo.DTO.OrderItemDTO;
import org.springframework.stereotype.Service;

@Service
public interface OrderService {
    Object orderProduct(OrderItemDTO orderItemDTO);
}

package com.example.demo.Implementation;

import com.example.demo.DTO.OrderItemDTO;
import com.example.demo.Model.OrderItems;
import com.example.demo.Model.Product;
import com.example.demo.Repository.OrderItemsRepository;
import com.example.demo.Repository.ProductRepository;
import com.example.demo.Service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderItemImplementation implements OrderService {
    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Object orderProduct(OrderItemDTO orderItem) {


        try {
            OrderItems items=new OrderItems();
            Product product=productRepository.findById(orderItem.getProductId())
                    .orElseThrow(()-> new IllegalArgumentException("Product  not found"));
            if(product.getInventory().getQuantity()>=orderItem.getQuantity()){
                items.setQuantity(orderItem.getQuantity());
                items.setProduct(product);
                orderItemsRepository.save(items);
                return "saved";
            } else {
                return "out of stock";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Order failed to add to cart  " + e.getMessage();
        }

    }
}

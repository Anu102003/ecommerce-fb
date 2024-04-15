package com.example.demo.Implementation;

import com.example.demo.DTO.OrderDetailsDTO;
import com.example.demo.Model.Inventory;
import com.example.demo.Model.OrderDetails;
import com.example.demo.Model.OrderItems;
import com.example.demo.Model.UserDetail;
import com.example.demo.Repository.*;
import com.example.demo.Service.OrderDetailService;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
///need to check security contextFilter ,payment gateway
@Service
public class OrderDetailImplementation implements OrderDetailService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;
    @Autowired
    private OrderItemsRepository orderItemsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InventoryRepository inventoryRepository;
    @Value("${rzp_keyId}")
   private  String keyId;
    @Value("${rzp_secretKeyId}")
   private String secretKeyId;

    @Override
    public String orderDetails(OrderDetailsDTO orderDetails) {
        try {
            String email= SecurityContextHolder.getContext().getAuthentication().getName();
            OrderDetails newOrder=new OrderDetails();
            List<OrderItems> orderItems=new ArrayList<>();
            Integer totalPrice=0;
            for(int i=0;i<orderDetails.getOrderedItems().size();i++){
                System.out.println(i);
            OrderItems checkOrder=  orderItemsRepository.findById(orderDetails.getOrderedItems().get(i))
                        .orElseThrow(()-> new IllegalArgumentException("Orders  not found"));
            if(checkOrder.getQuantity()<=checkOrder.getProduct().getInventory().getQuantity()){
                Inventory inventory=inventoryRepository.findById(checkOrder.getProduct().getInventory().getInventoryId())
                        .orElseThrow(()-> new IllegalArgumentException("Product  not found"));
                inventory.setQuantity(checkOrder.getProduct().getInventory().getQuantity()- checkOrder.getQuantity());
                totalPrice+=checkOrder.getProduct().getPrice()*checkOrder.getQuantity();
                orderItems.add(checkOrder);
            }
            }
            UserDetail userDetail=userRepository.findByUserEmail(email)
                    .orElseThrow(()-> new IllegalArgumentException("User  not found"));

            newOrder.setOrderItemsList(orderItems);
            newOrder.setTotal(totalPrice);
            newOrder.setUserDetail(userDetail);
            orderDetailsRepository.save(newOrder);
            try {
                RazorpayClient razorpayClient = new RazorpayClient(keyId, secretKeyId);
                JSONObject orderRequest = new JSONObject();
                orderRequest.put("amount", totalPrice);
                orderRequest.put("currency", "INR");
                orderRequest.put("receipt", "order_receipt_11");

                Order order = razorpayClient.orders.create(orderRequest);
                System.out.println(order);
                String orderid = order.get("id");
                return orderid;
            }catch (Exception e){
                e.printStackTrace();
                return "unable to make payment";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Order failed to add to cart  " + e.getMessage();
        }


    }
}

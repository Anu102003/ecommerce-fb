package com.example.demo.Repository;

import com.example.demo.Model.OrderDetails;
import com.example.demo.Model.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository  extends JpaRepository<OrderDetails,Integer> {





}

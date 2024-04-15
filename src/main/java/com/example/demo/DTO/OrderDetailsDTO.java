package com.example.demo.DTO;


import lombok.Data;

import java.util.List;
@Data
public class OrderDetailsDTO {
  private List<Integer> orderedItems;
  private Integer userId;

}

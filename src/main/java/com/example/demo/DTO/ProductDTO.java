package com.example.demo.DTO;

import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class ProductDTO {

 private Integer id;
  private   String title;
  private   String description;

  private    Integer price;
  private   String categoryName;
  private   Integer quantity;
  private String location;
  private String thumbnail;
  private String brand;

   private  String modelNo;
    private String color;
    private String weight;
    private String modelName;
    private List<String> images;
    private Map<String ,String> specifications;

}

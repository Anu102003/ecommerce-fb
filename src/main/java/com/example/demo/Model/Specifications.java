package com.example.demo.Model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.springframework.data.mongodb.core.CollectionCallback;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Map;

@Document(collection = "Product")
@Data
public class Specifications {
     @Id
     private String id;
     private Integer productId;
     private  String modelNo;
     private String modelName;
     private String color;
     private String weight;
     private Map<String ,String> specifications;
     private List<String> images;

}

package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Category {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer  categoryId;
    private String  categoryName;

    private  String slug;
    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "parent_id")
     private  Category parentCategory;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Product>  productList = new ArrayList<>();

     @Temporal(TemporalType.TIMESTAMP)
     @CreatedDate
     private Date createdAt;
     @Temporal(TemporalType.TIMESTAMP)
     @LastModifiedDate
     private Date modifiedAt;
}

package com.example.demo.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Data
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)

public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer inventoryId;
    private Integer quantity;
    //location
    private  String location;
    @OneToOne(mappedBy = "inventory")
    private Product product;

    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date modifiedAt;

}

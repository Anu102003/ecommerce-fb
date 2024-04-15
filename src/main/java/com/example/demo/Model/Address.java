package com.example.demo.Model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
@RequiredArgsConstructor
public class Address {
     @Id
     @GeneratedValue(strategy = GenerationType.IDENTITY)
     private  int  addressId;
     private String  addressOne;
     private  String addressTwo;
     private String  addressThree;
     private String city;
     private String State;
     private String Country;
     private String pinCode;
     @OneToOne(mappedBy = "address")
     private UserDetail user;

     @Temporal(TemporalType.TIMESTAMP)
     @CreatedDate
     private Date createdAt;
     @Temporal(TemporalType.TIMESTAMP)
     @LastModifiedDate
     private Date modifiedAt;


}

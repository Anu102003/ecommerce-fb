package com.example.demo.Model;


import jakarta.persistence.*;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.security.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Entity
@Data
@RequiredArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class ConfirmationToken {


    public ConfirmationToken(UserDetail userDetail) {

        createdDate = calculateExpiryDate(60*24);
        confirmationToken = UUID.randomUUID().toString();
        user=userDetail;

    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.MINUTE, expiryTimeInMinutes);
            return cal.getTime();

    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    private Long tokenId;
    private String confirmationToken;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @OneToOne
    private UserDetail user;
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date modifiedAt;


}

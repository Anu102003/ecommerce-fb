package com.example.demo.Repository;

import com.example.demo.DTO.UserOrderDTO;
import com.example.demo.Model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<UserDetail, Integer> {
    Optional<UserDetail>findByUserEmail(String email);
    UserDetail findByUserEmailIgnoreCase(String emailId);

    Boolean existsByUserEmail(String email);
    @Query(value = "select * from user_detail where user_name=:name", nativeQuery = true)
    UserDetail findByUserName(String name);
//    @Query(value = "select user_id,user_name, from user_detail where user_name=:name", nativeQuery = true)
//    UserDetail findByUserName( String name);
@Query(value = "select user_id as userId,user_name as UserName,user_email as UserEmail,user_mobile_number as UserMobileNumber,address_id as AddressId, password,role from user_detail where user_id=:userId", nativeQuery = true)
UserOrderDTO findByUserID(Integer userId);

}




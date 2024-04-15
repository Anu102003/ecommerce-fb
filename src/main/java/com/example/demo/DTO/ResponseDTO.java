package com.example.demo.DTO;

import lombok.Data;

@Data
public class ResponseDTO {
    private  String httpStatus;
    private String message;
    private Object data;
}

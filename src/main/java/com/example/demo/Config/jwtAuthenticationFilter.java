package com.example.demo.Config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
@Component
@AllArgsConstructor
@Configuration
public class jwtAuthenticationFilter  extends OncePerRequestFilter {

     @Autowired
     private jwtService JwtService;
     @Autowired
     private   UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal( @NotNull  HttpServletRequest request,
                                     @NotNull  HttpServletResponse response,
                                     @NotNull  FilterChain filterChain) throws ServletException, IOException {

        final String authHeader= request.getHeader("Authorization");
        final String jwt;
        final  String userEmail;
        System.out.println("dofilter");
        System.out.println(authHeader+"123");
        if(authHeader== null || ! authHeader.startsWith("Bearer ")){
           filterChain.doFilter(request,response);
            System.out.println("if 1");
           return;
        }
        jwt=authHeader.substring(7);
        userEmail=JwtService.extractUserName(jwt);
        if(userEmail !=null && SecurityContextHolder.getContext().getAuthentication()==null){
            System.out.println("do if 2");
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);
            if(JwtService.tokenValid(jwt,userDetails)){
                UsernamePasswordAuthenticationToken authToken=new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
       filterChain.doFilter(request,response);

    }
}

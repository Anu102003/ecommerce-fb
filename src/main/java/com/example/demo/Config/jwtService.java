package com.example.demo.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;
@Service

public class jwtService {
    private static final String secretKey="5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private static final long EXPIRATION_TIME = 3600000;
    private static final long EXPIRATION_TIME_RefreshToken = 7 * 24 * 60 * 60 * 1000;
    public String extractUserName(String token){
        return extractClaim(token,Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
   public String generateToken(Map<String, Object>extractClaims, UserDetails userDetails){
       Date now = new Date();
       Date expiration = new Date(now.getTime() + EXPIRATION_TIME);

       return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
   }
    public String generateRefreshToken(Map<String, Object>extractClaims, UserDetails userDetails){
        Date now = new Date();
        Date expiration = new Date(now.getTime() + EXPIRATION_TIME_RefreshToken);

        return Jwts.builder()
                .setClaims(extractClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }
   public String generateToken(UserDetails userDetails){
        return generateToken(new HashMap<>(),userDetails);
   }
   public boolean tokenValid(String token,UserDetails userDetails){
        final String userName=extractUserName(token);
       return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));

   }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token ){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    private Key getSignInKey(){
        byte[] keyBytes= Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

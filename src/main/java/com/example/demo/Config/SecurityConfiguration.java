package com.example.demo.Config;

import com.example.demo.Model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final jwtAuthenticationFilter jwtAuthFilter;

    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> {
                          auth.anyRequest().permitAll();
//                            auth.requestMatchers("api/login", "api/display", "api/subCategory/", "api/mainCategory", "api/refreshToken"
//                            ,"api/forgetPassword","api/resetPassword").permitAll();
//                            auth.requestMatchers("api/save/product", "api/addCategory",
//                                    "api/subCategory/**", "http://localhost:8080/api/addCategory").hasAnyAuthority(Role.ADMIN.name());
//                            auth.requestMatchers("api/save", "api/confirm-account").hasAnyAuthority(Role.USER.name());

                           // auth.anyRequest().authenticated();

                        }
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}

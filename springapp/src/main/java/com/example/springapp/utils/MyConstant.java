
package com.example.springapp.utils;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpHeaders.CONTENT_TYPE;
import static org.springframework.http.HttpMethod.DELETE;
import static org.springframework.http.HttpMethod.GET;
import static org.springframework.http.HttpMethod.HEAD;
import static org.springframework.http.HttpMethod.PATCH;
import static org.springframework.http.HttpMethod.POST;
import static org.springframework.http.HttpMethod.PUT;
import java.util.Arrays;
import java.util.List;

public class MyConstant {
    public static final String AUTH = "/api/v1/auth";
    public static final String ADMIN = "/userfunction/admin";
    public static final String LOGIN = "/login";
    public static final String REGISTER = "/register";
    public static final List<String> ORIGINS = Arrays.asList("http://localhost:5173/**","http://localhost:5173");
    public static final List<String> HEADERS = Arrays.asList(AUTHORIZATION, CONTENT_TYPE);
    public static final List<String> METHODS = Arrays.asList(GET.name(), POST.name(), PATCH.name(),
            PUT.name(), DELETE.name(), HEAD.name());

    // JsonWebToken
    public static final String JWT_LOCALHOST_URL = "http://localhost:8082";
    public static final String JWT_SECURITY_SCHEME_NAME = "bearerAuth";
    public static final String JWT_SCHEME = "bearer";
    public static final String JWT_DESCRIPTION = "Provide the JWT token.";
    public static final String JWT_BEARER_FORMAT = "JWT";
}

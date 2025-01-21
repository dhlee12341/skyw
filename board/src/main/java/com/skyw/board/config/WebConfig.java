package com.skyw.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// React (프론트엔드)와 Spring Boot (백엔드) 간의 CORS(Cross-Origin Resource Sharing) 문제를 해결하기 위해 작성된 설정 파일
// React와 Spring Boot 서버와 통신할 때 발생할 수 있는 CORS 제한을 허용하도록 설정하는 역할

// React에서 fetch()나 axios를 사용해 Spring Boot 서버의 API를 호출할 때, 
// React와 Spring Boot가 서로 다른 포트를 사용(3000과 8080)하므로 브라우저는 이를 "교차 출처 요청"으로 간주합니다.
// 이때 Spring Boot에서 CORS 설정(WebConfig)을 통해 React에서 오는 요청을 허용하도록 구성하면, 브라우저가 해당 요청을 허용하게 됩니다.

// React 앱이 http://localhost:3000에서 실행 중이고,
// Spring Boot 서버가 http://localhost:8080에서 실행 중일 때,
// React 앱에서 localhost:8080으로 API 요청을 보내면 CORS 문제가 발생할 수 있습니다.

@Configuration
public class WebConfig implements WebMvcConfigurer {  // 이 클래스가 Spring Boot 설정 클래스임을 나타냅니다.

    @SuppressWarnings("null")
    @Override
    public void addCorsMappings(CorsRegistry registry) {    // Spring MVC 설정을 사용자 정의하기 위해 사용하는 인터페이스
        registry.addMapping("/**")                          // addMapping("/**"): 모든 URL 경로에 대해 CORS를 허용합니다.
                .allowedOrigins("http://localhost:3000")    // allowedOrigins("http://localhost:3000"): React 애플리케이션(프론트엔드)에서 온 요청을 허용합니다.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS"): 허용할 HTTP 메서드(GET, POST 등)를 명시합니다.
                .allowedHeaders("*")                        // allowedHeaders("*"): 요청 헤더를 모두 허용합니다.
                .allowCredentials(true);                    // allowCredentials(true): 쿠키와 같은 자격 증명을 포함한 요청도 허용합니다.
    }
}

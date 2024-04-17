package OSSP214.taxmap.config;


import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.time.Duration;


// 백엔드에서 외부 API를 호출하기 위한 Rest Template 라이브러리의 Configuration
// Bean으로 등록해 사용할 때마다 생성하지 않고 singleton 유지
@Configuration
@RequiredArgsConstructor
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        return builder
                .requestFactory(() -> new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()))
                .setConnectTimeout(Duration.ofMillis(5000))
                .setReadTimeout(Duration.ofMillis(5000))
                .additionalMessageConverters(new StringHttpMessageConverter(StandardCharsets.UTF_8))
                .rootUri("https://dapi.kakao.com/v2/local/search")
                .build();
    }
}

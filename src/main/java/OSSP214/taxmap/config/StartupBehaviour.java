package OSSP214.taxmap.config;

import OSSP214.taxmap.models.Coords;
import OSSP214.taxmap.models.Organization;
import OSSP214.taxmap.models.Subsidy;
import OSSP214.taxmap.repositories.CoordsRepository;
import OSSP214.taxmap.repositories.OrganizationRepository;
import OSSP214.taxmap.repositories.SubsidyRepository;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.poiji.bind.Poiji;
import com.poiji.option.PoijiOptions;
import jakarta.transaction.Transactional;
import lombok.Data;
import org.apache.poi.ss.usermodel.*;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.lang.Thread.sleep;


// Kakao local API 호출 후 response 정보를 매핑하는 데 필요한 클래스
@Data
class ResponseDTO {
    private String lat;
    private String lng;

    @JsonProperty("documents")
    private void unpackNested(List<Map<String, Object>> documents) {
        this.lat = (String) documents.getFirst().get("y");
        this.lng = (String) documents.getFirst().get("x");
    }
}

// 서버 부팅시 수행할 행동 정의
// 클래스가 좀 방대해서 service 위의 service class로 구현하는 것도?
@Component
public class StartupBehaviour {
    private final SubsidyRepository subsidyRepository;
    private final OrganizationRepository organizationRepository;
    private final CoordsRepository coordsRepository;

    private final RestTemplate restTemplate;

    public StartupBehaviour(SubsidyRepository subsidyRepository, OrganizationRepository organizationRepository, CoordsRepository coordsRepository, RestTemplate restTemplate) {
        this.subsidyRepository = subsidyRepository;
        this.organizationRepository = organizationRepository;
        this.coordsRepository = coordsRepository;
        this.restTemplate = restTemplate;
    }


    // bean 생성과 서버 시작 사이에 호출되는 메서드
    // 3776개 데이터 기준 약 9분 소요
    @Transactional
    @EventListener(ContextRefreshedEvent.class)
    public void onStartup() {
        // db 구성 완료 시 호출 안하도록 기능 구현해야 함

        loadExcelData("c:/db/bojo2022.xlsx");
        initOrganizations();
        initCoordinates();
    }

    // xlsx 파일에서 시트, 행 순회하며 subsidy 데이터 받아오기
    public void loadExcelData(String fileName) {
        File file = new File(fileName);
        try (Workbook wb = WorkbookFactory.create(file)) {
            // 첫 번쨰 sheet 건너뜀
            for (int i = 1; i <= wb.getNumberOfSheets(); i++) {
                // 각 sheet마다
                PoijiOptions options = PoijiOptions.PoijiOptionsBuilder.settings()
                        .sheetIndex(i)
                        .build();
                List<Subsidy> subsidyList = Poiji.fromExcel(file, Subsidy.class, options);
                subsidyRepository.saveAll(subsidyList);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    // subsidy에서 기업 정보 추출 후 organization과 연결
    @Transactional
    public void initOrganizations() {

        List<Subsidy> subsidies = subsidyRepository.findAll();
        for (Subsidy subsidy : subsidies) {
            // 기업 이름으로 organization repo 검색, 없으면 새로 생성
            Organization organization = organizationRepository.findByOrgName(subsidy.getOrgName()).orElseGet(() ->
                    Organization.builder()
                            .subsidies(new ArrayList<>())
                            .orgName(subsidy.getOrgName())
                            .representativeName(subsidy.getRepresentativeName())
                            .phoneNumber(subsidy.getPhoneNumber())
                            .address(subsidy.getAddress())
                            .build());

            // subsidy와 organization 관계 설정 후 저장
            subsidy.setOrgInfo(organization);
            subsidyRepository.save(subsidy);
            organization.getSubsidies().add(subsidy);
            organizationRepository.save(organization);
        }
    }

    @Transactional
    public void initCoordinates() {

        // 각 Organization마다 Kakao map REST API 호출로 좌표를 받아온다
        // 그 뒤 CoordsRepository에 좌표로 검색 후, 없으면 신규생성
        // Organization에 Coords, Coords에 Organization 지정해준다
        // 카카오 API 키랑 db 계정정보는 나중에 암호화해야 할 듯..
        ResponseEntity<ResponseDTO> response;
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "99052343299d4c56b24da189fb71d403");
        HttpEntity<ResponseDTO> request = new HttpEntity<>(headers);

        // 주소 존재하는 organization만 받아옴
        List<Organization> organizations = organizationRepository.findAllByAddressNotNull();
        for (Organization organization : organizations) {
            try {
                // 카카오 API 요청
                response = restTemplate.exchange(
                        "/address?query=" + organization.getAddress(),
                        HttpMethod.GET,
                        request,
                        ResponseDTO.class
                );

                // response 처리
                ResponseDTO responseDTO = response.getBody();
                if (responseDTO != null) {
                    double latitude = Double.parseDouble(responseDTO.getLat());
                    double longitude = Double.parseDouble(responseDTO.getLng());

                    // 좌표로 coords repo 검색, 없으면 생성
                    Coords coords = coordsRepository.findByLatitudeAndLongitude(latitude, longitude).orElseGet(() ->
                            Coords.builder()
                            .latitude(latitude)
                            .longitude(longitude)
                            .organizations(new ArrayList<>())
                            .build()
                    );

                    // organization과 coords 관계 설정 후 저장
                    organization.setCoords(coords);
                    organizationRepository.save(organization);
                    coords.getOrganizations().add(organization);
                    coordsRepository.save(coords);
                } else throw (new RuntimeException("Response DTO from Kakao API is empty: address=" + organization.getAddress()));

                // 한번에 너무 많은 요청 보내지 않도록 delay
                sleep(100);

            // exception handler로 관리하는 방향으로..
            } catch (InterruptedException e) {
                System.out.println("Sleep interrupted");
            } catch (RuntimeException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}

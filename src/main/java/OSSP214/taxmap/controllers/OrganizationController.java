package OSSP214.taxmap.controllers;


import OSSP214.taxmap.models.Organization;
import OSSP214.taxmap.services.OrganizationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/org")
public class OrganizationController {

    private final OrganizationService organizationService;

    public OrganizationController(OrganizationService organizationService) {
        this.organizationService = organizationService;
    }

    @GetMapping(path = "/all")
    public List<Organization> all() {
        return organizationService.getAll();
    }

    @GetMapping(path = "/{id}")
    public Organization one(@PathVariable Long id) {
        return organizationService.getById(id).orElseThrow();
    }
}

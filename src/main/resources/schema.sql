CREATE TABLE subsidy_info
(id bigint not null auto_increment,
 gov_office varchar(255),
 financial_year varchar(255),
 business_year varchar(255),
 business_name varchar(255),
 org_name varchar(255),
 representative_name varchar(255),
 phone_number varchar(255),
 address varchar(255),
 total_business_expense varchar(255),
 gov_expense varchar(255),
 local_expense varchar(255),
 self_expense varchar(255),
 requested_subsidy varchar(255),
 gov_budget varchar(255),
 local_budget varchar(255),
 requested_paid varchar(255),
 authority_paid varchar(255),
 business_purpose text,
 business_description text,
 business_duration text,
 business_location text,
 subject_number text,
 misc_expense text,
 proceeds_process_method text,
 applier_asset text,
 expected_benefit text,
 performance_goal text,
 considerations text,
 primary key (id)
) engine=InnoDB;

SET GLOBAL local_infile=true;
LOAD DATA LOCAL INFILE "c:/db/bojo.csv"
     INTO TABLE taxmap.subsidy_info
     FIELDS TERMINATED BY "," OPTIONALLY ENCLOSED BY '"'
     IGNORE 1 ROWS
     (id, gov_office, financial_year, business_year, business_name, org_name, representative_name, phone_number, address, total_business_expense, gov_expense, local_expense, self_expense, requested_subsidy, gov_budget, local_budget, requested_paid, authority_paid, business_purpose, business_description, business_duration, business_location, subject_number, misc_expense, proceeds_process_method, applier_asset, expected_benefit, performance_goal, considerations)
     ;
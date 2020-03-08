CREATE TABLE student_info
(
    student_id INT NOT NULL AUTO_INCREMENT,
    first_name varchar(50),
    last_name varchar(55),
    emailid varchar(355) NOT NULL ,
    college_name varchar(455),
    password varchar(50) NOT NULL,
    PRIMARY KEY(student_id),
    UNIQUE(emailid)
);

CREATE TABLE student_details
(
    student_id INT NOT NULL AUTO_INCREMENT,
    emailid varchar(50) NOT NULL,
    city varchar(55),
    dob varchar(355),
    journey varchar(1455),
    education varchar(1550),
    work_exp varchar(1455),
    org_achieve varchar(1455),
    skills varchar(1455),
    mobile_number INT,
    PRIMARY KEY(student_id),
    UNIQUE(emailid),
    FOREIGN KEY (student_id) REFERENCES student_info(student_id)
);

CREATE TABLE company_details
(
    company_id INT NOT NULL AUTO_INCREMENT,
    name varchar(100),
    emailid varchar(50) NOT NULL UNIQUE,
    password varchar(50),
    location varchar(25),
    PRIMARY KEY(company_id),
    UNIQUE(emailid)
);

CREATE TABLE jobs_by_company
(
    job_id INT NOT NULL,
    company_id INT NOT NULL,
    PRIMARY KEY(job_id, company_id),
    FOREIGN KEY (job_id) REFERENCES jobs_details(job_id),
    FOREIGN KEY (company_id) REFERENCES company_details(company_id)
);

CREATE TABLE jobs_details
(
    job_id INT NOT NULL,
    company_id INT NOT NULL,
    title varchar(200),
    posting_date Date,
    app_deadline Date,
    location varchar(50),
    salary varchar(15),
    job_description varchar(2000),
    job_category ENUM('full-time', 'part-time', 'intern', 'on-campus'),
    PRIMARY KEY (job_id, company_id),
    FOREIGN KEY (company_id) REFERENCES company_details(company_id)
);

CREATE TABLE applications
(
    student_id INT NOT NULL,
    job_id INT NOT NULL,
    application_status ENUM('pending', 'reviewed', 'declined'),
    PRIMARY KEY(student_id, job_id),
    FOREIGN KEY (student_id) REFERENCES student_info(student_id),
    FOREIGN KEY (job_id) REFERENCES jobs_details(job_id)
    
);

CREATE TABLE events
(
    event_id INT NOT NULL AUTO_INCREMENT,
    event_name varchar(200),
    event_description varchar(2000),
    event_time TIME,
    event_date Date,
    event_location varchar(50),
    event_eligibility varchar(100),
    PRIMARY KEY(event_id)
);

CREATE TABLE event_attendance
(
    student_id INT NOT NULL,
    event_id INT NOT NULL,
    PRIMARY KEY(student_id, event_id),
    FOREIGN KEY (student_id) REFERENCES student_info(student_id),
    FOREIGN KEY (event_id) REFERENCES events(event_id)
);

-- UPDATE students_details 
-- SET 
--     Journey = 'Hill',
--     Education = 'mary.hill@classicmodelcars.com',
--     WorkExp = '',
--     OrgAchieve = '',
--     Skills = ''
--     Mobile_Number = ''
-- WHERE
--     EmailId = '';

-- EmailId, City, DOB, Journey, Education, WorkExp, OrgAchieve, Skills, Mobile_Number


CREATE TABLE students_info
(
FirstName varchar(50),
LastName varchar(55),
EmailId varchar(355),
CollegeName varchar(455),
Password varchar(50),
PRIMARY KEY(EmailId)
);

CREATE TABLE students_details
(
EmailId varchar(50),
City varchar(55),
DOB varchar(355),
Journey varchar(1455),
Education varchar(1550),
WorkExp varchar(1455),
OrgAchieve varchar(1455),
Skills varchar(1455),
Mobile_Number INT,
PRIMARY KEY(EmailId)
);

UPDATE students_details 
SET 
    Journey = 'Hill',
    Education = 'mary.hill@classicmodelcars.com',
    WorkExp = '',
    OrgAchieve = '',
    Skills = ''
    Mobile_Number = ''
WHERE
    EmailId = '';

EmailId, City, DOB, Journey, Education, WorkExp, OrgAchieve, Skills, Mobile_Number


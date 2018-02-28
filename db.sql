-- Database Creation
CREATE DATABASE IF NOT EXISTS wbl;
USE wbl;

-- Cluster
CREATE TABLE IF NOT EXISTS Cluster (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cluster VARCHAR(64) NOT NULL
);

INSERT INTO Cluster(cluster) VALUES("Agriculture Food & Natural Resources"), 
    ("Architecture & Construction"),
    ("Arts A/V Technology & Communications"), 
    ("Business Management & Administration"),
    ("Education & Training Finance"),
    ("Government & Public Administration"), 
    ("Health Science"),
    ("Hospitality & Tourism"), 
    ("Human Services"),
    ("Information Technology"),
    ("Law Public Safety Corrections & Security"), 
    ("Manufacturing"),
    ("Marketing"),
    ("Science Technology Engineering & Mathematics"), 
    ("Transportation Distribution & Logistics");

-- CTE PATHWAY
CREATE TABLE IF NOT EXISTS CTEPathway (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pathway VARCHAR(64) NOT NULL
);

INSERT INTO CTEPathway(pathway) VALUES("Web Design / Programming: (Adobe Certification)"), ("Hardware: (A+ Certification)"), ("Game Design: (Unity)");

-- Ethnicity
CREATE TABLE IF NOT EXISTS Ethnicity (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    ethnicity VARCHAR(64) NOT NULL
);

INSERT INTO Ethnicity(ethnicity) VALUES("White"),
    ("Black"),
    ("Asian"),
    ("Native American"),
    ("Alaska Native"),
    ("Native Hawaiian"),
    ("Pacific Islander"),
    ("Multi-Racial"),
    ("Other");

-- Hispanic
CREATE TABLE IF NOT EXISTS Hispanic (
    ID BIT(1) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type BIT(1) NOT NULL
);

-- Gender
CREATE TABLE IF NOT EXISTS Gender (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    gender VARCHAR(16) NOT NULL
);

INSERT INTO Gender(gender) VALUES("Male"),
    ("Female"),
    ("Other"),
    ("Prefer Not to say.");

-- SchoolContact
CREATE TABLE IF NOT EXISTS SchoolContact (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(32) NOT NULL,
    fax VARCHAR(32) NULL
);

-- Address
CREATE TABLE IF NOT EXISTS address (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address VARCHAR(64) NOT NULL,
    address2 VARCHAR(64) NULL,
    city VARCHAR(32) NOT NULL,
    state VARCHAR(64) NOT NULL,
    zip TINYINT NOT NULL
);

-- School Information
CREATE TABLE IF NOT EXISTS School (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(128) NOT NULL,
    website VARCHAR(128) NULL,
    addressID INTEGER NOT NULL,
    contactID INTEGER NOT NULL,
    FOREIGN KEY(addressID) REFERENCES Address(ID) ON DELETE CASCADE,
    FOREIGN KEY(contactID) REFERENCES SchoolContact(ID) ON DELETE CASCADE
);

-- Comment
CREATE TABLE IF NOT EXISTS Comment (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    comment TEXT NOT NULL
);

-- Evaluator 
CREATE TABLE IF NOT EXISTS Evaluator (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(128) NOT NULL,
    lastName VARCHAR(128) NOT NULL,
    title VARCHAR(16) NOT NULL,
    grade TINYINT NOT NULL,
    commentID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES Comment(ID) ON DELETE CASCADE
);

-- Idea Status
CREATE TABLE IF NOT EXISTS IdeaStatus (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    status VARCHAR(16) NOT NULL
);

INSERT INTO ideaStatus(status) VALUES("Service Required"),
    ("No Service");

-- Profile Information
CREATE TABLE IF NOT EXISTS Profile (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(64) NOT NULL,
    midName VARCHAR(64) NULL,
    lastName VARCHAR(64) NOT NULL,
    dob DATE NOT NULL,
    gradYear SMALLINT NULL,
    grade TINYINT NULL,
    genderOther VARCHAR(32) NULL,
    raceOther VARCHAR(32) NULL,
    resume TEXT NULL,
    clusterID TINYINT NULL,
    ethnicityID TINYINT NULL,
    hispanicID BIT(1) NULL,
    schoolID INTEGER NULL,
    genderID TINYINT NULL,
    evaluatorID INTEGER NULL,
    addressID INTEGER NULL,
    ideaStatusID TINYINT NULL,
    pathwayID TINYINT NOT NULL,
    FOREIGN KEY(clusterID) REFERENCES Cluster(ID),
    FOREIGN KEY(ethnicityID) REFERENCES Ethnicity(ID),
    FOREIGN KEY(hispanicID) REFERENCES Hispanic(ID),
    FOREIGN KEY(schoolID) REFERENCES School(ID),
    FOREIGN KEY(genderID) REFERENCES Gender(ID),
    FOREIGN KEY(evaluatorID) REFERENCES Evaluator(ID) ON DELETE CASCADE,
    FOREIGN KEY(addressID) REFERENCES Address(ID) ON DELETE CASCADE,
    FOREIGN KEY(ideaStatusID) REFERENCES IdeaStatus(ID),
    FOREIGN KEY(pathwayID) REFERENCES CTEPathway(ID)
);

-- Account Types
CREATE TABLE IF NOT EXISTS AccountType (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(32) NOT NULL
);

INSERT INTO AccountType(type) VALUES("Super Admin"), ("Admin"), ("Teachers"), ("Evaluators"), ("Students");

-- Account Information
CREATE TABLE IF NOT EXISTS Account (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    OSIS TEXT NOT NULL,
    email VARCHAR(64) NOT NULL,
    password TEXT NOT NULL,
    dateCreated DATE NOT NULL,
    lastLogin DATE NULL,
    lastUpdate DATE NULL,
    verified BOOLEAN NOT NULL DEFAULT 0,
    profileID INTEGER NOT NULL,
    accountTypeID TINYINT NOT NULL,
    FOREIGN KEY (profileID) REFERENCES Profile(ID) ON DELETE CASCADE,
    FOREIGN KEY (accountTypeID) REFERENCES AccountType(ID) ON DELETE CASCADE
); 

-- Verification
CREATE TABLE Verification (
      ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
      accountID INTEGER NOT NULL,
      link TEXT NOT NULL,
      FOREIGN KEY (accountID) REFERENCES Account(ID)
);

-- Term
CREATE TABLE IF NOT EXISTS Term (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    term VARCHAR(8) NOT NULL
);

INSERT INTO Term(term) VALUES("Spring"),
    ("Summer"),
    ("Fall");

-- Course
CREATE TABLE IF NOT EXISTS Course (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    hours INTEGER NOT NULL,
    commentID INTEGER NULL,
    profileID INTEGER NOT NULL,
    termID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES Comment(ID),
    FOREIGN KEY(profileID) REFERENCES Profile(ID),
    FOREIGN KEY(termID) REFERENCES Term(ID)
);

-- ContactType
CREATE TABLE IF NOT EXISTS ContactType (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type TEXT NOT NULL
);

-- Contact
CREATE TABLE IF NOT EXISTS Contact (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(64) NOT NULL,
    lastName VARCHAR(64) NOT NULL,
    phone VARCHAR(32) NOT NULL,
    cell VARCHAR(32) NOT NULL,
    contactTypeID TINYINT NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(contactTypeID) REFERENCES ContactType(ID),
    FOREIGN KEY(profileID) REFERENCES Profile(ID)
);

-- WBL Type
CREATE TABLE IF NOT EXISTS WBLType (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type TEXT NOT NULL
);

INSERT INTO WBLType(type) VALUES("Guest Speaker"),
    ("Career Day"),
    ("Career Mentoring"),
    ("Workplace Tours"),
    ("International Interviews"),
    ("Job Shadowing"),
    ("Mock Interviews"),
    ("Workplace Challenges"),
    ("Intenships"),
    ("Work Experiences");

-- WBL Activities
CREATE TABLE IF NOT EXISTS WBLActivity (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    organization VARCHAR(128) NOT NULL,
    hours SMALLINT NOT NULL,
    wblTypeID TINYINT NOT NULL,
    profileID INTEGER NOT NULL,
    commentID INTEGER NOT NULL,
    FOREIGN KEY(wblTypeID) REFERENCES WBLType(ID),
    FOREIGN KEY(profileID) REFERENCES Profile(ID),
    FOREIGN KEY(commentID) REFERENCES Comment(ID)
);

-- Certifications
CREATE TABLE IF NOT EXISTS Certification (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    name VARCHAR(128) NOT NULL,
    authority VARCHAR(128) NOT NULL,
    score SMALLINT NOT NULL,
    commentID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES Comment(ID),
    FOREIGN KEY(profileID) REFERENCES Profile(ID)
);

-- Proficiency
CREATE TABLE IF NOT EXISTS Proficiency (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO Proficiency(name, description) VALUES("Not Exposed", "The opportunity has not yet been provided to the student to demonstrate the skill."), ("Training Level", "Preparing to become work ready, but has difficulty completing tasks without prompting and repeated help. Does not readily request help. Does not attempt task before asking for or receiving assistance. "), ("Improving Towards Entry Level", "More work ready. Has difficulty completing some tasks. May attempt task before asking for help. Needs prompting or assistance. "), ("Entry Level", "Meets and demonstrates the skills at a level equal to what is expected of any employee in a similar position. Completes tasks and work projects with and without help. Improves work using team or supervisor feedback. Meets quality standards. "), ("Exceeds Entry Level", "Demonstrates mastery of skills at a level above what is expected of any employee in a similar position. Uses information generated personally and by others to improve work quality. Identifies problems before they arise and makes adjustments accordingly. Exceeds work expectations for quality and attends to detail in the development of projects and assignments.");

-- ProfessionalType
CREATE TABLE IF NOT EXISTS ProfessionalSkill (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    skill TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO ProfessionalSkill (skill, description) VALUES ("Supervision", "Needs minimal supervision to complete tasks."),
    ("Focus", "Maintains focus on tasks despite internal and/or external distractions."),
    ("AdapTABLE IF NOT EXISTS", "Adapts approach in response to new conditions or others’ actions."),
    ("Time Management", "Manages time to complete tasks on schedule."),
    ("Impact Awareness", "Recognizes the consequences of one’s actions."),
    ("Team Spirit", "Balances own needs with the needs of others."),
    ("Collaboration","Helps team members complete tasks, as needed."),
    ("Problem Solver", "Identifies alternative ideas/processes that are more effective."),
    ("Motivation", "Brings energy and enthusiasm to the work."),
    ("Responsibility", "Takes responsibility for their actions, instead of blaming others.");

-- Professional Skill
CREATE TABLE IF NOT EXISTS Professional (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    profileID INTEGER NOT NULL,
    professionalSkillID TINYINT NOT NULL,
    FOREIGN KEY(profileID) REFERENCES Profile(ID),
    FOREIGN KEY(professionalSkillID) REFERENCES ProfessionalSkill(ID)
);

-- Professional Assessment
CREATE TABLE IF NOT EXISTS ProfessionalAssessment (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentScore TINYINT NOT NULL,
    evaluatorScore TINYINT NULL,
    grade TINYINT NOT NULL,
    professionalID INT NOT NULL,
    FOREIGN KEY(studentScore) REFERENCES Proficiency(ID),
    FOREIGN KEY(evaluatorScore) REFERENCES Proficiency(ID),
    FOREIGN KEY(professionalID) REFERENCES Professional(ID)
);

-- Technical Skill
CREATE TABLE IF NOT EXISTS Technical (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    skill TEXT NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES Profile(ID)
);

-- Technical Assessment
CREATE TABLE IF NOT EXISTS TechnicalAssessment (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentScore TINYINT NOT NULL,
    evaluatorScore TINYINT NULL,
    grade TINYINT NOT NULL,
    technicalSkillID INT NOT NULL,
    FOREIGN KEY(technicalSkillID) REFERENCES Technical(
    ID),
    FOREIGN KEY(studentScore) REFERENCES Proficiency(ID),
    FOREIGN KEY(evaluatorScore) REFERENCES Proficiency(ID)
);

-- Event Type
-- CREATE TABLE IF NOT EXISTS EventType (
--     ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     type TEXT NOT NULL
-- );

-- Event
-- CREATE TABLE IF NOT EXISTS Event (
--     ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     name TEXT NOT NULL,
--     date DATE NOT NULL,
--     location TEXT NOT NULL,
--     eventTypeID INTEGER NOT NULL,
--     FOREIGN KEY(eventTypeID) REFERENCES eventType(ID)
-- );

-- Attendee
-- CREATE TABLE IF NOT EXISTS attendee (
--     ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     eventID INTEGER NOT NULL,
--     profileID INTEGER NOT NULL,
--     FOREIGN KEY(eventID) REFERENCES event(ID),
--     FOREIGN KEY(profileID) REFERENCES profile(ID)
-- );

-- -- Internship
-- CREATE TABLE IF NOT EXISTS internship (
--     ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     description TEXT NOT NULL,
--     date DATE NOT NULL,
--     length INTEGER NOT NULL,
--     company TEXT NOT NULL,
--     skillsLearned TEXT NOT NULL,
--     profileID INTEGER NOT NULL,
--     FOREIGN KEY(profileID) REFERENCES profile(ID)
-- );

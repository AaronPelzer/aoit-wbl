-- Database Creation
CREATE DATABASE IF NOT EXISTS wbl;
USE wbl;

-- Cluster
CREATE TABLE IF NOT EXISTS cluster (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL
);

INSERT INTO cluster(title) VALUES("Agriculture Food & Natural Resources"), 
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

-- Race
CREATE TABLE IF NOT EXISTS race (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    race TEXT NOT NULL
);

INSERT INTO race(race) VALUES("White"),
    ("Black"),
    ("Asian"),
    ("Native American"),
    ("Alaska Native"),
    ("Native Hawaiian"),
    ("Pacific Islander"),
    ("Multi-Racial"),
    ("Other");

-- Hispanic
CREATE TABLE IF NOT EXISTS hispanic (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type BOOLEAN NOT NULL
);

-- Gender
CREATE TABLE IF NOT EXISTS gender (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    gender TEXT NOT NULL
);

INSERT INTO gender(gender) VALUES("Male"),
    ("Female"),
    ("Other");

-- SchoolContact
CREATE TABLE IF NOT EXISTS schoolContact (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    phone TEXT NOT NULL,
    fax TEXT NULL
);

-- Address
CREATE TABLE IF NOT EXISTS address (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    address TEXT NOT NULL,
    address2 TEXT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL
);

-- School Information
CREATE TABLE IF NOT EXISTS school (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    website TEXT NULL,
    addressID INTEGER NOT NULL,
    contactID INTEGER NOT NULL,
    FOREIGN KEY(addressID) REFERENCES address(ID),
    FOREIGN KEY(contactID) REFERENCES schoolContact(ID)
);

-- Comment
CREATE TABLE IF NOT EXISTS comment (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    comment TEXT NOT NULL
);

-- Evaluator 
CREATE TABLE IF NOT EXISTS evaluator (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fName TEXT NOT NULL,
    lName TEXT NOT NULL,
    title TEXT NOT NULL,
    grade TINYINT NOT NULL,
    commentID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES comment(ID)
);

-- Idea Status
CREATE TABLE IF NOT EXISTS ideaStatus (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    status TEXT NOT NULL
);

INSERT INTO ideaStatus(status) VALUES("Service Required"),
    ("No Service");

-- Profile Information
CREATE TABLE IF NOT EXISTS profile (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    firstName TEXT NOT NULL,
    midName TEXT NULL,
    lastName TEXT NOT NULL,
    dob DATE NOT NULL,
    gradYear INTEGER NULL,
    grade TINYINT NULL,
    genderOther TEXT NULL,
    raceOther TEXT NULL,
    resume TEXT NULL,
    clusterID INTEGER NULL,
    raceID INTEGER NULL,
    hispanicID INTEGER NULL,
    schoolID INTEGER NULL,
    genderID INTEGER NULL,
    evaluatorID INTEGER NULL,
    addressID INTEGER NULL,
    ideaStatusID INTEGER NULL,
    FOREIGN KEY(clusterID) REFERENCES cluster(ID),
    FOREIGN KEY(raceID) REFERENCES race(ID),
    FOREIGN KEY(hispanicID) REFERENCES hispanic(ID),
    FOREIGN KEY(schoolID) REFERENCES school(ID),
    FOREIGN KEY(genderID) REFERENCES gender(ID),
    FOREIGN KEY(evaluatorID) REFERENCES evaluator(ID),
    FOREIGN KEY(addressID) REFERENCES address(ID),
    FOREIGN KEY(ideaStatusID) REFERENCES ideaStatus(ID)
);

-- Account Types
CREATE TABLE IF NOT EXISTS accountType (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type TEXT NOT NULL
);

INSERT INTO accountType(type) VALUES("Super Admin"), ("Admin"), ("Teachers"), ("Evaluators"), ("Students");

-- Account Information
CREATE TABLE IF NOT EXISTS account (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    OSIS TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    dateCreated DATE NOT NULL,
    lastLogin DATE NOT NULL,
    lastUpdate DATE NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT 0,
    profileID INTEGER NOT NULL,
    accountTypeID INTEGER NOT NULL,
    FOREIGN KEY (profileID) REFERENCES profile(ID),
    FOREIGN KEY (accountTypeID) REFERENCES accountType(ID)
); 

-- Verification
CREATE TABLE verification (
      ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
      accountID INTEGER NOT NULL,
      link TEXT NOT NULL,
      FOREIGN KEY (accountID) REFERENCES account(ID)
);

-- Term
CREATE TABLE IF NOT EXISTS term (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    term TEXT NOT NULL
);

INSERT INTO term(term) VALUES("Spring"),
    ("Summer"),
    ("Fall");

-- Course
CREATE TABLE IF NOT EXISTS course (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    hours INTEGER NOT NULL,
    commentID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    termID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES comment(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(termID) REFERENCES term(ID)
);

-- ContactType
CREATE TABLE IF NOT EXISTS contactType (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type TEXT NOT NULL
);

-- Contact
CREATE TABLE IF NOT EXISTS contact (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    fName TEXT NOT NULL,
    lName TEXT NOT NULL,
    phone TEXT NOT NULL,
    cell TEXT NOT NULL,
    contactTypeID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(contactTypeID) REFERENCES contactType(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- WBL Type
CREATE TABLE IF NOT EXISTS wblType (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type TEXT NOT NULL
);

INSERT INTO wblType(type) VALUES("Guest Speaker"),
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
CREATE TABLE IF NOT EXISTS wblActivity (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    organization TEXT NOT NULL,
    hours INTEGER NOT NULL,
    wblTypeID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    commentID INTEGER NOT NULL,
    FOREIGN KEY(wblTypeID) REFERENCES wblType(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(commentID) REFERENCES comment(ID)
);

-- Certifications
CREATE TABLE IF NOT EXISTS certification (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    date DATE NOT NULL,
    name TEXT NOT NULL,
    authority TEXT NOT NULL,
    score INTEGER NOT NULL,
    commentID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES comment(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- Proficiency
CREATE TABLE IF NOT EXISTS proficiency (
    ID TINYINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO proficiency(name, description) VALUES("Not Exposed", "The opportunity has not yet been provided to the student to demonstrate the skill."), ("Training Level", "Preparing to become work ready, but has difficulty completing tasks without prompting and repeated help. Does not readily request help. Does not attempt task before asking for or receiving assistance. "), ("Improving Towards Entry Level", "More work ready. Has difficulty completing some tasks. May attempt task before asking for help. Needs prompting or assistance. "), ("Entry Level", "Meets and demonstrates the skills at a level equal to what is expected of any employee in a similar position. Completes tasks and work projects with and without help. Improves work using team or supervisor feedback. Meets quality standards. "), ("Exceeds Entry Level", "Demonstrates mastery of skills at a level above what is expected of any employee in a similar position. Uses information generated personally and by others to improve work quality. Identifies problems before they arise and makes adjustments accordingly. Exceeds work expectations for quality and attends to detail in the development of projects and assignments.");

-- ProfessionalType
CREATE TABLE IF NOT EXISTS professionalSkill (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    skill TEXT NOT NULL,
    description TEXT NOT NULL
);

INSERT INTO professionalSkill (skill, description) VALUES ("Supervision", "Needs minimal supervision to complete tasks."),
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
CREATE TABLE IF NOT EXISTS professional (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    profileID INTEGER NOT NULL,
    professionalSkillID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(professionalSkillID) REFERENCES professionalSkill(ID)
);

-- Professional Assessment
CREATE TABLE IF NOT EXISTS professionalAssessment (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentScore TINYINT NOT NULL,
    evaluatorScore TINYINT NULL,
    grade TINYINT NOT NULL,
    professionalSkillID INT NOT NULL,
    FOREIGN KEY(studentScore) REFERENCES proficiency(ID),
    FOREIGN KEY(evaluatorScore) REFERENCES proficiency(ID),
    FOREIGN KEY(professionalSkillID) REFERENCES professional(ID)
);

-- Technical Skill
CREATE TABLE IF NOT EXISTS technical (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    skill TEXT NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- Technical Assessment
CREATE TABLE IF NOT EXISTS technicalAssessment (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentScore TINYINT NOT NULL,
    evaluatorScore TINYINT NULL,
    grade TINYINT NOT NULL,
    technicalSkillID INT NOT NULL,
    FOREIGN KEY(technicalSkillID) REFERENCES technical(
    ID),
    FOREIGN KEY(studentScore) REFERENCES proficiency(ID),
    FOREIGN KEY(evaluatorScore) REFERENCES proficiency(ID)
);

-- Event Type
CREATE TABLE IF NOT EXISTS eventType (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    type TEXT NOT NULL
);

-- Event
CREATE TABLE IF NOT EXISTS event (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    date DATE NOT NULL,
    location TEXT NOT NULL,
    eventTypeID INTEGER NOT NULL,
    FOREIGN KEY(eventTypeID) REFERENCES eventType(ID)
);

-- Attendee
CREATE TABLE IF NOT EXISTS attendee (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    eventID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(eventID) REFERENCES event(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- Internship
CREATE TABLE IF NOT EXISTS internship (
    ID INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    length INTEGER NOT NULL,
    company TEXT NOT NULL,
    skillsLearned TEXT NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);
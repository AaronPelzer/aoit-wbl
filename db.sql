CREATE TABLE accountType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type int NOT NULL
);

//
// Account Information
CREATE TABLE account (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    OSIS TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    dateCreated TEXT NOT NULL, 
    profileID INTEGER NOT NULL,
    accountTypeID INTEGER NOT NULL,
    lastLogin TEXT NOT NULL,
    lastUpdate TEXT NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(accountTypeID) REFERENCES accountType(ID)
);

CREATE TABLE school (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    addressId INT NOT NULL,
    FOREIGN KEY(addressId) REFERENCES address(ID)
);

CREATE TABLE address (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    address TEXT NOT NULL,
    address2 TEXT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL
);

CREATE TABLE contact (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    schoolID INT NOT NULL,
    type TEXT NULL,
    desc TEXT NULL
);


CREATE TABLE contactType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);


// Student Information
CREATE TABLE profile (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    midName TEXT NULL,
    lastName TEXT NOT NULL,
    genderID INT NOT NULL,
    genderOther TEXT NULL,
    dob Date NOT NULL
);

CREATE TABLE genderType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
);

INSERT INTO genderType(type) VALUES("Male"),
    ("Female"),
    ("Other");

CREATE TABLE cluster (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    Title TEXT NOT NULL,
    Description TEXT NULL
);


INSERT INTO cluster(Title) VALUES("Agriculture Food & Natural Resources"), 
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
    ("Manufacturing"),Type
    ("Marketing"),
    ("Science Technology Engineering & Mathematics"), 
    ("Transportation Distribution & Logistics");

CREATE TABLE race (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
);

INSERT INTO race(type) VALUES("White"),
    ("Black"),
    ("Asian"),
    ("Native American"),
    ("Alaska Native"),
    ("Native Hawaiian"),
    ("Pacific Islander"),
    ("Multi-Racial"),
    ("Other");

CREATE TABLE hispanic (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    profileId INT NOT NULL,
    selected INT NOT NULL
);

CREATE TABLE ideaStatus (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    typeId INTEGER NOT NULL,
    FOREIGN KEY(typeid) REFERENCES ideaStatusTypes(ID)
);

CREATE TABLE ideaStatusTypes(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
);

INSERT INTO ideaStatusTypes(title) VALUES("Service Required"), ("No Service");


//
// CTE Courses
CREATE TABLE courses(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    year INT NOT NULL,
    hours INT NOT NULL,
    profileID INT NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

CREATE TABLE term(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);

INSERT INTO term(name) VALUES("Spring"),("Summer"),("Fall");

CREATE TABLE comments (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    courseID INTEGER NOT NULL,
    message TEXT NULL,
    FOREIGN KEY(courseID) REFERENCES courses(ID)
);

CREATE TABLE profiency (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    desc TEXT NOT NULL
);

CREATE TABLE skills (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    desc TEXT NOT NULL
);
Type
INSERT INTO skills (title, desc) VALUES ("Supervision", "Needs minimal supervision to complete tasks."),
    ("Focus", "Maintains focus on tasks despite internal and/or external distractions."),
    ("Adaptable", "Adapts approach in response to new conditions or others’ actions."),
    ("Time Management", "Manages time to complete tasks on schedule."),
    ("Impact Awareness", "Recognizes the consequences of one’s actions."),
    ("Team Spirit", "Balances own needs with the needs of others."),
    ("Collaboration","Helps team members complete tasks, as needed."),
    ("Problem Solver", "Identifies alternative ideas/processes that are more effective."),
    ("Motivation", "Brings energy and enthusiasm to the work."),
    ("Responsibility", "Takes responsibility for their actions, instead of blaming others.");


// 
// ASSESSMENT
CREATE TABLE technical (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    profileID INT NOT NULL,
    grade INT NOT NULL,
    personType INT NOT NULL,
    assessmentID INT NOT NULL
);

CREATE TABLE personType(
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    who TEXT NOT NULL
);

INSERT INTO personType (who) VALUES("self"), ("evaluator");

CREATE TABLE assessment (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type INT NOT NULL,
    rating INT NOT NULL
);


CREATE TABLE evaluator (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    first TEXT NOT NULL,
    last TEXT NOT NULL,
    title TEXT NOT NULL,
    grade INT NOT NULL,
    comment TEXT NULL
);

CREATE TABLE professional (
    ID INTEGER NOT NULL PRIMARY KEY,
    profileID INT NOT NULL,
    professionalTypeID INT NOT NULL,
    grade TINYINT NOT NULL,
    selfEval TINYINT NOT NULL,
    teachEval TINYINT NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(professionalTypeID) REFERENCES professionalType(ID)
);

CREATE TABLE professionalType(
    ID INTEGER NOT NULL PRIMARY KEY,
    title TEXT NOT NULL,
    desc TEXT NOT NULL
)

INSERT INTO professionalType(title, desc) VALUES ("SUPERVISION", "Needs minimal supervision to complete tasks."),
("FOCUS", "Maintains focus on tasks despite internal and/or external distractions."),
("ADAPTABLE", "Adapts approach in response to new conditions or others’ actions."),
("TIME MANAGEMENT", "Manages time to complete tasks on schedule."),
("IMPACT AWARENESS", "Recognizes the consequences of one’s actions."),
("TEAM SPIRIT", "Balances own needs with the needs of others."),
("COLLABORATION", "Helps team members complete tasks, as needed."),
("PROBLEM SOLVER", "Identifies alternative ideas/processes that are more effective."),
("MOTIVATION", "Brings energy and enthusiasm to the work."),
("RESPONSIBILITY", "Takes responsibility for their actions, instead of blaming others.");



CREATE TABLE wblType(
    ID INTEGER NOT NULL PRIMARY KEY,
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

CREATE TABLE verification(
    ID INTEGER NOT NULL PRIMARY KEY,
    accountID INTEGER NOT NULL,
    link TEXT NOT NULL,
    FOREIGN KEY(accountID) REFERENCES account(ID)
)
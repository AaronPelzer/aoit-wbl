-- Account Types
CREATE TABLE accountType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type INTEGER NOT NULL
);;

-- Verified 
CREATE TABLE verified (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    email TEXT NOT NULL,
    accountID INTEGER NOT NULL,
    FOREIGN KEY(accountID) REFERENCES account(ID)
);

-- Account Information
CREATE TABLE account (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    OSIS TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    dateCreated DATE NOT NULL,
    lastLogin DATE NOT NULL,
    lastUpdated DATE NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT 0,
    profileID INTEGER NOT NULL,
    accountTypeID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(accountTypeID) REFERENCES accountType(ID)
); 

-- Profile Information
CREATE TABLE profile (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    fName TEXT NOT NULL,
    mName TEXT NULL,
    lName TEXT NOT NULL,
    dob DATE NOT NULL,
    gradYear INTEGER NULL,
    grade TINYINTEGER NULL,
    genderOther TEXT NULL,
    raceOther NULL,
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

-- School Information
CREATE TABLE school (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    website TEXT NULL,
    addressID INTEGER NOT NULL,
    contactID INTEGER NOT NULL,
    FOREIGN KEY(addressID) REFERENCES address(ID),
    FOREIGN KEY(contactID) REFERENCES schoolContact(ID)
);

-- Cluster
CREATE TABLE cluster (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE race (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE hispanic (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type BOOLEAN NOT NULL
);

-- Course
CREATE TABLE course (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- Term
CREATE TABLE term (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    term TEXT NOT NULL
);

INSERT INTO term(name) VALUES("Spring"),
    ("Summer"),
    ("Fall");

-- Gender
CREATE TABLE gender (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    gender TEXT NOT NULL
);

INSERT INTO gender(gender) VALUES("Male"),
    ("Female"),
    ("Other");

-- Contact
CREATE TABLE contact (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    fName TEXT NOT NULL,
    lName TEXT NOT NULL,
    phone TEXT NOT NULL,
    cell TEXT NOT NULL,
    contactTypeID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(contactTypeID) REFERENCES contactType(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- ContactType
CREATE TABLE contactType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
);

-- SchoolContact
CREATE TABLE schoolContact (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    phone TEXT NOT NULL,
    fax TEXT NULL
);

-- Address
CREATE TABLE address (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    address TEXT NOT NULL,
    address2 TEXT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip TEXT NOT NULL
);

-- Evaluator 
CREATE TABLE evaluator (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    fName TEXT NOT NULL,
    lName TEXT NOT NULL,
    title TEXT NOT NULL,
    grade TINYINT NOT NULL,
    commentID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES comment(ID)
);

-- Comment
CREATE TABLE comment (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    comment INTEGER NOT NULL
);

-- Idea Status
CREATE TABLE ideaStatus (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    status TEXT NOT NULL
);

INSERT INTO ideaStatus(status) VALUES("Service Required"),
    ("No Service");

-- WBL Activities
CREATE TABLE wblActivity (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- WBL Type
CREATE TABLE wblType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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

-- Certifications
CREATE TABLE certification (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    date DATE NOT NULL,
    name TEXT NOT NULL,
    authority TEXT NOT NULL,
    score INTEGER NOT NULL,
    commentID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(commentID) REFERENCES comment(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- Professional
CREATE TABLE professional (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    profileID INTEGER NOT NULL,
    professionalSkillID INTEGER NOT NULL,
    assessmentID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID),
    FOREIGN KEY(professionalSkillID) REFERENCES professionalSkill(ID),
    FOREIGN KEY(assessmentID) REFERENCES assessment(ID)
);

-- ProfessionalType
CREATE TABLE professionalSkill (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    skill TEXT NOT NULL,
    desc TEXT NOT NULL
);

INSERT INTO professionalSkill (title, desc) VALUES ("Supervision", "Needs minimal supervision to complete tasks."),
    ("Focus", "Maintains focus on tasks despite internal and/or external distractions."),
    ("Adaptable", "Adapts approach in response to new conditions or others’ actions."),
    ("Time Management", "Manages time to complete tasks on schedule."),
    ("Impact Awareness", "Recognizes the consequences of one’s actions."),
    ("Team Spirit", "Balances own needs with the needs of others."),
    ("Collaboration","Helps team members complete tasks, as needed."),
    ("Problem Solver", "Identifies alternative ideas/processes that are more effective."),
    ("Motivation", "Brings energy and enthusiasm to the work."),
    ("Responsibility", "Takes responsibility for their actions, instead of blaming others.");


-- Assessment
CREATE TABLE assessment (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    selfEval TINYINT NOT NULL,
    techEval TINYINT NULL,
    grade TINYINTEGER NOT NULL
);

-- Technical
CREATE TABLE technical (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    skill TEXT NOT NULL,
    assessmentID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(assessmentID) REFERENCES assessment(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- Attendee
CREATE TABLE attendee (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    eventID INTEGER NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(eventID) REFERENCES event(ID),
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

-- Event
CREATE TABLE event (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    date DATE NOT NULL,
    location TEXT NOT NULL,
    eventTypeID INTEGER NOT NULL,
    FOREIGN KEY(eventTypeID) REFERENCES eventType(ID)
);

-- Event Type
CREATE TABLE eventType (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
);

-- Proficiency
CREATE TABLE proficiency (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    desc TEXT NOT NULL
);

-- Internship
CREATE TABLE internship (
    ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    desc TEXT NOT NULL,
    date DATE NOT NULL,
    length INTEGER NOT NULL,
    company TEXT NOT NULL,
    skillsLearned TEXT NOT NULL,
    profileID INTEGER NOT NULL,
    FOREIGN KEY(profileID) REFERENCES profile(ID)
);

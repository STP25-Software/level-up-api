-- migrate:up

CREATE TABLE registrations (
    id SERIAL PRIMARY KEY,
    
    -- Full Name: string between 5 and 50 characters
    "name" VARCHAR(60) NOT NULL,
    
    -- Mobile Number: must be 11 digits
    "phone" CHAR(15) NOT NULL,
    
    -- Email:
    email VARCHAR(255) NOT NULL,
    
    -- Academic Year Enum: received as a number
    "year" INTEGER NOT NULL CHECK ("year" IN (1, 2, 3, 4, 5)),
    -- Enum mapping:
    -- 1 = Freshman
    -- 2 = Sophomore
    -- 3 = Junior
    -- 4 = Senior 1
    -- 5 = Senior 2
    
    -- Specialization Enum: received as a number
    spec INTEGER NOT NULL CHECK (spec IN (1, 2, 3, 4, 5)),
    -- Enum mapping:
    -- 1 = Preparatory
    -- 2 = Electrical
    -- 3 = Mechanical
    -- 4 = Architecture
    -- 5 = Civil
    
    -- Participation Choice: received as a number (enum)
    competition INTEGER NOT NULL CHECK (competition IN (1, 2, 3)),
    -- Enum mapping:
    -- 1 = Event Attendee
    -- 2 = Hackathon Reverse Eng. Participant
    -- 3 = Hackathon AI Participant
    
    -- Team Name: applicable only if participating in a hackathon
    "teamName" VARCHAR(255),
    
    -- Why apply for the hackathon/AI competition
    reason TEXT,
    
    -- Mention previous experience in competitions/AI competitions
    experience TEXT,
    
    -- Expectations about the event
    expectations TEXT,
    
    -- Additional comments
    "comments" TEXT,
    
    -- Created and Updated timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down

DROP TABLE registrations;


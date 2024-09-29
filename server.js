const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Function to initialize the database and create the table if it doesn't exist
const initializeDatabase = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS submissions (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            mobile_number VARCHAR(20),
            email VARCHAR(255),
            academic_year VARCHAR(50),
            specialization VARCHAR(100),
            hackathon_type VARCHAR(50),  -- AI or Reverse Engineering
            team_name VARCHAR(100),
            reason TEXT,
            previous_experience TEXT,
            team_members TEXT,
            expectations TEXT,
            comments TEXT
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing the database:', error);
    }
};

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running successfully' });
});

app.get('/submit', (req, res) => {
    res.status(200).json({ message: 'Server is running successfully' });
});


// API endpoint to handle form submissions
app.post('/submit', async (req, res) => {
    const {
        name,
        mobile_number,
        email,
        academic_year,
        specialization,
        hackathon_type,
        team_name,
        reason,
        previous_experience,
        team_members,
        expectations,
        comments,
    } = req.body;

    try {
        // Validate required fields
        if (req.body.attendee) {
            // Attendee specific validation
            if (!name || !mobile_number || !email || !academic_year || !specialization || !expectations || !comments) {
                return res.status(400).json({ error: 'Missing required fields for attendee' });
            }

            // Prepare the SQL query for attendees
            const query = `
                INSERT INTO submissions (name, mobile_number, email, academic_year, specialization, expectations, comments)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `;
            const values = [name, mobile_number, email, academic_year, specialization, expectations, comments];

            // Execute the query
            await pool.query(query, values);
        } else {
            // Hackathon participant specific validation
            if (!name || !mobile_number || !email || !academic_year || !specialization || !hackathon_type || !team_name || !reason || !previous_experience || !team_members || !expectations || !comments) {
                return res.status(400).json({ error: 'Missing required fields for hackathon participant' });
            }

            // Prepare the SQL query for hackathon participants
            const query = `
                INSERT INTO submissions (name, mobile_number, email, academic_year, specialization, hackathon_type, team_name, reason, previous_experience, team_members, expectations, comments)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            `;
            const values = [name, mobile_number, email, academic_year, specialization, hackathon_type, team_name, reason, previous_experience, team_members, expectations, comments];

            // Execute the query
            await pool.query(query, values);
        }

        res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
        console.error('Error submitting the form:', error.message);
        res.status(500).json({ error: 'Error submitting the form', details: error.message });
    }
});

// Start the server and initialize the database
const startServer = async () => {
    await initializeDatabase();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

startServer();


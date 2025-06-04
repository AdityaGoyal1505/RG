const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., index.html)
app.use(express.static(path.join(__dirname)));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Ensure index.html is in the same directory as server.js
});

// Configure Nodemailer with Hostinger SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com', // Hostinger SMTP server
    port: 465,                 // Use 465 for SSL or 587 for TLS
    secure: true,              // true for SSL (port 465), false for TLS (port 587)
    auth: {
        user: 'support@rgcs.co.in', // Replace with your Hostinger email address
        pass: 'Support@123'      // Replace with your Hostinger email password
    }
});

// Route to handle booking form submissions
app.post('/book', async (req, res) => {
    const { name, email, message, service, budget, phone } = req.body;

    // Validate required fields
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Construct email options
        const mailOptions = {
            from: '"Booking System" <support@rgcs.co.in>', // Sender address
            to: 'support@rgcs.co.in',                     // Replace with recipient email
            subject: 'New Booking Request',
            text: `New Booking Request:
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Budget: ${budget}
            Area: ${service}
            Message: ${message}`,
            html: `<p><b>New Booking Request:</b></p>
                   <p><b>Name:</b> ${name}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Budget:</b> ${budget}</p>
                   <p><b>Area:</b> ${service}</p>
                   <p><b>Message:</b> ${message}</p>`
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response); // Log success response

        res.status(200).json({ success: 'Booking request sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error); // Log error details
        res.status(500).json({ error: 'Failed to send booking request' });
    }
});

// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

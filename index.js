
const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submissions
app.post('/send-email', async (req, res) => {
  try {
    const { subject, body, type } = req.body;
    
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'tuttyger@gmail.com',
        pass: 'cqfpoixkqqihvgvx' // Consider using environment variables for security
      }
    });

    // Email options
    const mailOptions = {
      from: 'tuttyger@gmail.com',
      to: 'support@cbelko.net',
      subject: subject,
      text: body
    };

    // Send email
    await transporter.sendMail(mailOptions);
    
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Access the app at: http://localhost:${PORT}`);
});

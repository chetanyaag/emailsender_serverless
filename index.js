
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');

const app = express();

const ads = [
  { title: 'Hello, world! agas' }
];

app.use(helmet());
app.use(bodyParser.json());

app.use(cors());

app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send(ads);
});
app.post('/api/mail', async (req, res) => {

  const requestData = req.body;
  console.log('Received POST data:');
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'chetanyaagrawal@gmail.com',
      pass: 'qssx vzzf dvzt mmiu',
    },
  });
  const mailOptions = {
    from: 'chetanyaagrawall@gmail.com',
    to: 'gaurangagrawal626@gmail.com',
    subject: 'Hello, World!',
    text: 'This is a test email from Node.js',
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});
// starting the server
// app.listen(3000, () => {
//   console.log('listening on port 3001');
// });
module.exports.handler = serverless(app);
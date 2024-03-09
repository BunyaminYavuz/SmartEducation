// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID);
  res.status(200).render('index', {
    page: 'index',
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page: 'about',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page: 'contact',
  });
};

exports.mailSender = async (req, res) => {
  try {
    const outputMessage = `
    
    <h1>Mail Details </h1>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'example@gmail.com', // gmail account
        pass: 'password', // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Smart EDUCATION Contact Form" <example@gmail.com>', // sender address
      to: 'example@gmail.com', // list of receivers
      subject: 'Smart EDUCATION Contact Form New Message ✔', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    // req.flash('success', 'We Received your message succesfully');

    res.status(200).redirect('/contact');
  } catch (err) {
    //req.flash("error", `Something happened! ${err}`);
    // req.flash('error', `Something happened!`);
    console.log(err);
    res.status(200).redirect('/contact');
  }
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page: 'register',
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page: 'login',
  });
};

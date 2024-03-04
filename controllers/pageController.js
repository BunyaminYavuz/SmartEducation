exports.getIndexPage = (req, res) => {
  res.status(200).render('index', {
    page: 'index',
  });
};

exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
      page: 'about',
    });
  };


exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page: 'register'
  })
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page: 'login'
  })
}
  

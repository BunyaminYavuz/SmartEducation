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
  

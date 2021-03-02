exports.verify = (req, res, next) => {
    const session = req.session;
    if (!session) {
      res.redirect('/login');
    } else {
      if (session.loggedin) {
        next();
      } else {
        res.redirect('/login');
      }
    }
  }
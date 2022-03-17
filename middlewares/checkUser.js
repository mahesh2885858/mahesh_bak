const checkUser = (req, res, next) => {
  const id = req.session.userId;
  if (id) {
    req.id = id;
  } else {
    return;
  }
  next();
};
export default checkUser;

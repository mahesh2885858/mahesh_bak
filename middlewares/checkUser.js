const checkUser = (req, res, next) => {
  const id = req.session.userID;
  if (id) {
    req.id = id;
  } else {
    return;
  }
  next();
};
export default checkUser;

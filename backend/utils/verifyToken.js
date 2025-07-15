import jwt from 'jsonwebtoken';

// ✅ Accept a callback as the 4th argument
export const verifyToken = (req, res, next, callback) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ success: false, message: "You're not authorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Token is invalid" });
    }

    req.user = user;
    callback(); // ✅ Now this runs the next check
  });
};

// ✅ FIX: Don’t check params.id since your POST has no :id
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    // Accept any logged-in user
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ success: false, message: "You're not authenticated" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === 'admin') {
      next();
    } else {
      return res.status(401).json({ success: false, message: "You're not authorized" });
    }
  });
};

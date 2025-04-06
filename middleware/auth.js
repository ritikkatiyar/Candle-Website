import jwt from "jsonwebtoken";

export const verifyToken = async (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return { valid: false, error: "No token provided" };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: "Invalid token" };
  }
};

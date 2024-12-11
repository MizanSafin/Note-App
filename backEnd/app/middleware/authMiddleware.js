import { TokenDecode } from "../utilities/tokenUtility.js"

export default async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res
        .status(404)
        .send({ success: false, message: "Token not found" })
    }
    let decoded = TokenDecode(token)

    if (decoded === null) {
      return res.status(401).send({ success: false, message: "Unauthorized" })
    } else {
      let email = decoded.email
      let user_id = decoded.user_id
      // email,user_id add with request header
      req.headers.email = email
      req.headers.user_id = user_id
      next()
    }
  } catch (error) {
    return res.status(500).json({ succcess: false, message: error.message })
  }
}

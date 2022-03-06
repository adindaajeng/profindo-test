const util = require("util");

// Import connection
const db = require("../Database/Connection");

// Import create token
const createToken = require("./../Helpers/JWTSign");

let query = util.promisify(db.query).bind(db);

const login = async (req, res) => {
  let data = req.body;

  let scriptQuery = `SELECT * from apoteker WHERE namaApoteker = ? and tanggalLahir = ?`;

  try {
    getApoteker = await query(scriptQuery, [
      data.namaApoteker,
      data.tanggalLahir,
    ]).catch((error) => {
      throw error;
    });

    if (getApoteker.length == 0) {
      throw {
        status: 400,
        message: "Error username atau password",
        detail: "Password atau username anda salah",
      };
    }
    let { kodeApoteker, namaApoteker } = getApoteker[0];

    let token = createToken({
      kodeApoteker,
      namaApoteker,
    });

    res.status(200).send({
      token,
    });
  } catch (error) {
    console.log(error);
    if (error.status) {
      res.status(error.status).send({
        error: true,
        message: error.message,
        detail: error.detail,
      });
    } else {
      res.status(500).send({
        error: true,
        message: error.message,
      });
    }
  }
};

module.exports = {
  login,
};

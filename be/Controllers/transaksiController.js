const util = require("util");

// Import connection
const db = require("../Database/Connection");

let query = util.promisify(db.query).bind(db);

const addTransaksi = async (req, res) => {
  let { idTransaksi, kodeObat, jumlahJual, tanggalBeli } = req.body;

  let { kodeApoteker } = req.user;

  let scriptQuery = `INSERT INTO transaksi SET ?`;

  let dataToSend = {
    idTransaksi,
    kodeObat,
    jumlahJual,
    kodeApoteker,
    tanggalBeli,
  };

  try {
    let addDataTransaksi = await query(scriptQuery, dataToSend).catch((err) => {
      throw err;
    });

    res.status(200).send({
      message: "Berhasil menambah data transaksi",
    });
  } catch (error) {
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
};

module.exports = { addTransaksi };

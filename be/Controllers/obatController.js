const util = require("util");

// Import connection
const db = require("../Database/Connection");

let query = util.promisify(db.query).bind(db);

const addObat = async (req, res) => {
  let { kodeObat, namaObat, hargaObat, sisaObat, tanggalKadaluarsa } = req.body;

  let scriptQuery = `INSERT INTO obat SET ?`;

  let dataToSend = {
    kodeObat,
    namaObat,
    hargaObat,
    sisaObat,
    tanggalKadaluarsa,
  };

  try {
    const insertObat = await query(scriptQuery, dataToSend).catch((err) => {
      throw err;
    });

    res.status(200).send({
      kodeObat,
      namaObat,
      hargaObat,
      sisaObat,
      tanggalKadaluarsa,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
};

const getObat = async (req, res) => {
  let scriptQuery = `SELECT * FROM obat`;

  try {
    const getDataObat = await query(scriptQuery).catch((err) => {
      throw err;
    });

    res.status(200).send({
      data: getDataObat,
    });
  } catch (error) {
    res.status(error.status).send({
      error: true,
      message: error.message,
      detail: error.detail,
    });
  }
};

const editObat = async (req, res) => {
  let { kodeObat, namaObat, hargaObat, sisaObat, tanggalKadaluarsa } = req.body;

  let scriptQuery = `UPDATE obat SET ? WHERE kodeObat = ?`;

  let dataToSend = {
    namaObat,
    hargaObat,
    sisaObat,
    tanggalKadaluarsa,
  };

  try {
    let editDataObat = await query(scriptQuery, [dataToSend, kodeObat]).catch(
      (err) => {
        throw err;
      }
    );

    res.status(200).send({
      message: "Data sudah diupdate",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
};

const deleteObat = async (req, res) => {
  let scriptQuery = `DELETE FROM obat WHERE kodeObat = ?`;

  try {
    let deleteDataObat = await query(scriptQuery, req.params.kodeObat).catch(
      (err) => {
        throw err;
      }
    );

    res.status(200).send({
      message: "Berhasil delete data obat",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: true,
      message: error.message,
    });
  }
};

module.exports = { addObat, getObat, editObat, deleteObat };

const { MongoClient } = require('mongodb')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect('mongodb+srv://pearlnerijeancalape:pearlnerijean.calape@cluster0.1mzryqu.mongodb.net/Avon?retryWrites=true&w=majority')
      .then(client => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection
}
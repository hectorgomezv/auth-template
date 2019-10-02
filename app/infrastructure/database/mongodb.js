const { MongoClient } = require('mongodb');
const { logger } = require('../logger');

const {
  MONGO_CONNECTION_STRING,
  MONGO_DATABASE_NAME,
} = process.env;

let connection;

const client = new MongoClient(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  reconnectTries: Number.MAX_VALUE,
});

const connect = async () => {
  try {
    await client.connect();
    connection = await client.db(MONGO_DATABASE_NAME);

    return logger.info(`Connected to database ${MONGO_DATABASE_NAME} on MongoDB`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

const disconnect = async () => {
  await client.close();
};

const db = () => connection;

module.exports = {
  db,
  connect,
  disconnect,
};

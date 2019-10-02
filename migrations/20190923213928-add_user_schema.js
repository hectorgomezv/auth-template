const USERS_COLLECTION = 'users';

const up = async (db) => {
  db.createCollection(USERS_COLLECTION, {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'email', 'password', 'role', 'fullName', 'active', 'sessions'],
        properties: {
          username: {
            bsonType: 'string',
          },
          email: {
            bsonType: 'string',
            pattern: '^.+@.+$',
          },
          password: {
            bsonType: 'string',
          },
          avatarUrl: {
            bsonType: 'string',
          },
          fullName: {
            bsonType: 'string',
          },
          role: {
            bsonType: 'string',
          },
          active: {
            bsonType: 'boolean',
          },
          activationCode: {
            bsonType: 'string',
          },
          sessions: {
            bsonType: ['array'],
            items: {
              bsonType: 'object',
              required: ['accessToken', 'refreshToken'],
              properties: {
                accessToken: {
                  bsonType: 'string',
                },
                refreshToken: {
                  bsonType: 'string',
                },
              },
            },
          },
        },
      },
    },
  });
};

const down = async (db) => {
  db.collection(USERS_COLLECTION).drop();
};

module.exports = {
  up,
  down,
};

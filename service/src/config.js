  const {
  NODE_ENV,
  PERSISTENCE_USER,
  PERSISTENCE_PASSWORD,
  PERSISTENCE_DB,
} = process.env;

const base = {
  database: {},
  shortCode: {
    minLength: 6,
  },
};

const config = {
  development: {
    ...base,
    database: {
      dialect: "sqlite",
      storage: "db.sqlite",
    },
  },
  test: {
    ...base,
    database: {
      dialect: "sqlite",
      storage: "db.sqlite",
    },
  },
  production: {
    ...base,
    database: {
      url: `postgresql://${PERSISTENCE_USER}:${PERSISTENCE_PASSWORD}@persistence/${PERSISTENCE_DB}`,
      dialect: "postgres",
    },
  },
};

module.exports = config[NODE_ENV];

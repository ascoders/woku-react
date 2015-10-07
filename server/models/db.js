var conf = require('../config/config')
var Sequelize = require('sequelize')

module.exports = new Sequelize(conf.db.name, conf.db.user, conf.db.password, {
    host: conf.db.host,
    dialect: conf.db.dialect,
    pool: {
        max: 10,
        min: 1,
        idle: 10000
    },
    logging: false
})

var sequelize = require('sequelize')
var db = require('../db')

var model = base.define('app', {
    id: {
        comment: '主键',
        type: sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    path: {
        comment: 'url路径',
        type: sequelize.CHAR(10),
        unique: true,
        validate: {
            len: {
                args: [2, 10],
                msg: '路径长度为2-10'
            }
        }
    },
    name: {
        comment: '名称',
        type: sequelize.CHAR(10),
        unique: true,
        validate: {
            len: {
                args: [2, 10],
                msg: '昵称长度为2-10'
            }
        }
    },
    owner: {
        comment: '所有者',
        type: sequelize.INTEGER.UNSIGNED
    },
    type: {
        comment: 'app分类',
        type: sequelize.CHAR(10),
        validate: {
            len: {
                args: [1, 10],
                msg: '类型长度为1-10'
            }
        }
    },
    logo: {
        comment: '商标图片url',
        type: sequelize.STRING(60),
        validate: {
            len: {
                args: [1, 60],
                msg: 'logo长度为1-60'
            }
        }
    },
    icon: {
        comment: 'tab图片url',
        type: sequelize.STRING(60),
        validate: {
            len: {
                args: [1, 60],
                msg: 'icon长度为1-60'
            }
        }
    },
    hot: {
        comment: '活跃度',
        type: 'TINYINT'
    },
    gate: {
        comment: '是否可访问',
        type: sequelize.BOOLEAN,
        defaultValue: true
    }
}, {
    underscored: true
})

model.sync()

module.exports = model

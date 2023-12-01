const { object } = require("zod")
const db = require("../../models")
const user = require("../../models/user")
const { validateStringLength } = require("../utils/string")
const { validateUuid } = require("../utils/uuid")
const { Op, Sequelize } = require("sequelize")
class UserConfig {
    constructor() {
        this.fieldMapping = Object.freeze(
            {
                id: "id",
                firstName: "firstName",
                lastName: "lastName",
                email: "email",
                username: "username",
                password: "password",
                isAdmin: "isAdmin"
            }
        )
        this.model = db.user
        this.modelName = db.user.name
        this.tableName = db.user.tableName

        this.filters = Object.freeze({
            email: (email) => {
                validateStringLength(email, "email", undefined, 255)
                return Sequelize.where(Sequelize.fn("lower",
                    Sequelize.col(this.columnMapping.email)),
                    { [Op.eq]: `${email.toLowerCase()}` }
                )
            },
            id: (id) => {
                validateUuid(id, "user config")
                return {
                    [this.fieldMapping.id]: {
                        [Op.eq]: id
                    }
                }
            },
            username: (username) => {
                validateStringLength(username, "username", undefined, 255)
                return {
                    [this.fieldMapping.username]: {
                        [Op.eq]: username
                    }
                }
            },
        })
        this.associations = Object.freeze({
            contactFilter: 'contactFilter'
        })
    }
}




const userConfig = new UserConfig()
// deepFreeze(userConfig)

module.exports = userConfig

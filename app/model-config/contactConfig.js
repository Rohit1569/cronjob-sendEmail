const db = require("../../models")
const contact = require("../../models/contact")
const { validateStringLength } = require("../utils/string")
const { validateUuid } = require("../utils/uuid")
const { Op, Sequelize } = require("sequelize")
class ContactConfig {
    constructor() {
        this.fieldMapping = Object.freeze(
            {
                id: "id",
                firstName: "firstName",
                lastName: "lastName",
                userId: "userId"
            }
        )
        this.model = db.contact
        this.modelName = db.contact.name
        this.tableName = db.contact.tableName

        this.filters = Object.freeze({
            // email: (email) => {
            //     validateStringLength(email, "email", undefined, 255)
            //     return Sequelize.where(Sequelize.fn("lower",
            //         Sequelize.col(this.columnMapping.email)),
            //         { [Op.eq]: `${email.toLowerCase()}` }
            //     )
            // },
            id: (id) => {
                // validateUuid(id, "user config")
                return {
                    [this.fieldMapping.id]: {
                        [Op.eq]: id
                    }
                }
            },
            firstName: (firstName) => {
                validateStringLength(firstName, "firstname", undefined, 255)
                return {
                    [this.fieldMapping.firstName]: {
                        [Op.like]: '%${firstName}%'
                    }
                }
            },
            lastName: (lastName) => {
                validateStringLength(lastName, "lastname", undefined, 255)
                return {
                    [this.fieldMapping.lastName]: {
                        [Op.eq]: '%${Name}%'
                    }
                }
            },
        })
    }
}
const contactConfig = new ContactConfig()
// deepFreeze(userConfig)

module.exports = contactConfig

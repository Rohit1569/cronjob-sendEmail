const db = require("../../models")
const contactdetail = require("../../models/contactdetail")
const { validateStringLength } = require("../utils/string")
const { validateUuid } = require("../utils/uuid")
const { Op, Sequelize } = require("sequelize")
class ContactDetailConfig {
    constructor() {
        this.fieldMapping = Object.freeze(
            {
                id: "id",
                typeOfContactDetail: "typeOfContactDetail",
                valueOfContactDetail: "valueOfContactDetail",
                userId: "userId",
                contactId: "contactId"
            }
        )
        this.model = db.contactdetail
        this.modelName = db.contactdetail.name
        this.tableName = db.contactdetail.tableName

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
const contactDetailConfig = new ContactDetailConfig()
// deepFreeze(userConfig)

module.exports = contactDetailConfig

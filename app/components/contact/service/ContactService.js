const contactConfig = require("../../../model-config/contactConfig");
const { startTransaction } = require("../../../sequelize/transaction");
const { parseFilterQueries, parseLimitAndOffset, parseSelectFields } = require("../../../utils/request")

class ContactService {
    constructor() { }

    async createContact(body) {
        const transaction = await startTransaction()
        try {
            const dbUserContact = await contactConfig.model.create(body, { transaction })
            await transaction.commit()
            console.log(dbUserContact);
            return dbUserContact

        }
        catch (error) {
            await transaction.rollback()
            throw error
        }
    }
    async getAllContacts(settingsConfig, queryParams) {
        const t = await startTransaction()
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserService] : Inside getAllUsers`);
            // const myWhereClause = parseFilterQueries(queryParams, userConfig.filters)
            const attributesToReturn = {
                id: contactConfig.fieldMapping.id,
                firstName: contactConfig.fieldMapping.firstName,
                lastName: contactConfig.fieldMapping.lastName,
                userId: contactConfig.fieldMapping.userId
                // email: userConfig.fieldMapping.email,
                // username: userConfig.fieldMapping.username,
                // isAdmin: userConfig.fieldMapping.isAdmin
            }
            let selectArray = parseSelectFields(queryParams, attributesToReturn);
            if (!selectArray) {
                selectArray = Object.values(attributesToReturn)
            }
            // limitOffset = parseLimitAndOffset(queryParams)
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", userConfig)
            const data = await contactConfig.model.findAndCountAll({
                transaction: t,
                ...parseFilterQueries(queryParams, userConfig.filters),
                attributes: selectArray,
                ...parseLimitAndOffset(queryParams)
            });
            t.commit()
            return data
        } catch (error) {
            t.rollback()
            throw error
        }
    }

    async updateContact(body, contactId) {
        const transaction = await startTransaction()
        try {
            // await this.#checkForeignKeys(cyc, transaction)
            // await validateResourceExistence(cycConfig.model, cyc.id, transaction)

            // if (cyc.userRequestId) {
            //   await validateResourceExistence(userRequestConfig.model, cyc.userRequestId, transaction)
            // }

            // await this.#doesUserRequestExist(cyc.userRequestId, cyc.userId, transaction)

            await contactConfig.model.update(body, {
                where: {
                    id: contactId
                }
            }, transaction)

            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }


}



module.exports = ContactService
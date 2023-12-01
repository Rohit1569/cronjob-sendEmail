const userConfig = require("../../../model-config/userConfig");
const contactConfig = require("../../../model-config/contactConfig");
const contactDetailConfig = require("../../../model-config/contactDetailConfig");
const { startTransaction } = require("../../../sequelize/transaction");
const { preloadAssociations } = require("../../../sequelize/association")
const { parseFilterQueries, parseLimitAndOffset, parseSelectFields } = require("../../../utils/request")
class ContactDetailService {
    constructor() { }

    async createContactDetail(body) {
        const transaction = await startTransaction()
        try {
            const dbUserContactDetail = await contactDetailConfig.model.create(body, { transaction })
            await transaction.commit()
            console.log(dbUserContactDetail);
            return dbUserContactDetail

        }
        catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    async updateContact(body, contactdetailId) {
        const transaction = await startTransaction()
        try {


            await contactDetailConfig.model.update(body, {
                where: {
                    id: contactdetailId
                }
            }, transaction)

            await transaction.commit()
        } catch (error) {
            await transaction.rollback()
            throw error
        }
    }

    async getAllContactDetail(settingsConfig, queryParams) {
        const t = await startTransaction()
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserService] : Inside getAllUsers`);
            // const myWhereClause = parseFilterQueries(queryParams, userConfig.filters)
            const attributesToReturn = {
                id: contactDetailConfig.fieldMapping.id,
                typeOfContactDetail: contactDetailConfig.fieldMapping.typeOfContactDetail,
                valueOfContactDetail: contactDetailConfig.fieldMapping.valueOfContactDetail,
                userId: contactDetailConfig.fieldMapping.userId,
                contactId: contactDetailConfig.fieldMapping.contactId
                // email: userConfig.fieldMapping.email,
                // username: userConfig.fieldMapping.username,
                // isAdmin: userConfig.fieldMapping.isAdmin
            }
            let selectArray = parseSelectFields(queryParams, attributesToReturn);
            if (!selectArray) {
                selectArray = Object.values(attributesToReturn)
            }
            // limitOffset = parseLimitAndOffset(queryParams)
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", userConfig)
            const data = await contactDetailConfig.model.findAndCountAll({
                transaction: t,
                //    ...parseFilterQueries(queryParams, userConfig.filters),
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

    async deleteContactDetailByid(contactDetailId) {
        const transaction = await startTransaction();
        try {
            const deleteContactById = await contactDetailConfig.model.destroy({
                where: {
                    id: contactDetailId
                }
            }, transaction)
            await transaction.commit();
            return "deleted"
        }
        catch (error) {
            await transaction.rollback();
            throw (error)
        }
    }

}

module.exports = ContactDetailService
const { StatusCodes } = require("http-status-codes")
const contactDetailService = require("../service/ContactDetailService");


class ContactDetailController {
    constructor() {
        this.contactDetailService = new contactDetailService()
    }

    async add(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger
            logger.info(`[ADD_CONTROLLER] :: START : Inside add controller`);
            // let body = { id, firstName, lastName }
            let body = (req.body)
            // let userId = (req.params.userId);
            // let [myUser] = await User.findUserById(userId);
            // let contactId = (req.params.contactId);
            // let [myContact] = await User.findUserById(userId);
            const newContact = await this.contactDetailService.createContactDetail(body)
            logger.info(`[ADD_CONTROLLER] :: END : End of add controller`);
            // console.log(body);
            return res.status(StatusCodes.CREATED).json(newContact)
        } catch (error) {
            next(error)
        }
    }

    async getAllContactDetail(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside getAllUsers`);
            const queryParams = req.query
            const { count, rows } = await this.contactDetailService.getAllContactDetail(settingsConfig, queryParams)
            return res.status(StatusCodes.ACCEPTED).json({ count, rows })

        } catch (error) {
            next(error)
        }
    }

    async updateContactDetail(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger
            logger.info(`[ContactDetail_CONTROLLER] :: START : Inside  update controller`);

            let body = (req.body)
            const userId = req.params.userId
            // validateUuid(cyc.id, "clone your customer")

            const contactId = req.params.contactId
            // validateUuid(userId, "user")
            // cyc.updatedBy = userId

            // const missingKeys = this.validationService.getMissingKeys(cyc, [
            //   cycConfig.fieldMapping.id, cycConfig.fieldMapping.updatedBy, cycConfig.fieldMapping.name,
            //   cycConfig.fieldMapping.fileId, cycConfig.fieldMapping.tamFilterId, cycConfig.fieldMapping.userRequestId,
            //   cycConfig.fieldMapping.userId,
            // ])
            // this.validationService.processMissingKeys(missingKeys)
            // cycConfig.validate(cyc)

            await this.contactDetailService.updateContact(body, userId, contactId)
            logger.info(`[ContactDetail_CONTROLLER] :: END : End of update controller`);
            return res.status(StatusCodes.ACCEPTED).json(null)
        } catch (error) {
            next(error)
        }
    }

    async deleteContactDetail(settingsConfig, req, res, next) {
        const logger = settingsConfig.logger;
        logger.info(`[USER_CONTROLLER] :: START : Inside Controller`);
        try {
            const contactDetailId = req.params.contactDetailId


            const deleteContactDetail = await this.contactDetailService.deleteContactDetailByid(contactDetailId)
            return res.status(StatusCodes.OK).json(deleteContactDetail)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ContactDetailController()
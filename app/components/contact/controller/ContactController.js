const { StatusCodes } = require("http-status-codes")
const ContactService = require("../service/ContactService");
const User = require("../../user/service/UserService");

class ContactController {
    constructor() {
        this.contactService = new ContactService()
    }


    async add(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger
            logger.info(`[ADD_CONTROLLER] :: START : Inside add controller`);
            let body = (req.body)
            const newContact = await this.contactService.createContact(body)
            logger.info(`[ADD_CONTROLLER] :: END : End of add controller`);
            // console.log(body);
            return res.status(StatusCodes.CREATED).json(newContact)
        } catch (error) {
            next(error)
        }
    }


    async getAllContacts(settingsConfig, req, res, next) {
        try {
            const logger = settingsConfig.logger;
            logger.info(`[UserController] : Inside getAllUsers`);
            const queryParams = req.query
            const { count, rows } = await this.contactService.getAllUsers(settingsConfig, queryParams)
            return res.status(StatusCodes.ACCEPTED).json({ count, rows })

        } catch (error) {
            next(error)
        }
    }

}

module.exports = new Contact()
const employeeConfig = require("../../../model-config/employeeConfig");
const { startTransaction } = require("../../../sequelize/transaction")
const { parseLimitAndOffset, unmarshalBody, parseSelectFields, parseFilterQueries } = require('../../../utils/request');
class EmployeeService {
  constructor() {
  }

  async getAllEmpoyeeEmail(settingsConfig, queryParams) {
    const t = await startTransaction()
    try {
      const selectArray = {
        email: employeeConfig.fieldMapping.email
      }
      const attributeToReturn = Object.values(selectArray)
      const includeQuery = queryParams.include || [];
      const logger = settingsConfig.logger;
      logger.info(`[Employee_SERVICE] : Inside getAllEmployee`);
      const data = await employeeConfig.model.findAndCountAll({
        transaction: t,
        ...parseFilterQueries(queryParams, employeeConfig.filter),
        attributes: attributeToReturn,
        ...parseLimitAndOffset(queryParams)
      })
      if (data == null) {
        throw new Error("Record Does Not Exists")

      }
      t.commit()
      console.log(data.rows.map(employee => employee.email), "array");
      return data
    } catch (error) {
      t.rollback()
      throw error
    }
  }

}

const employeeService = new EmployeeService()
module.exports = employeeService
import I18n from '../i18n'
import * as Yup from 'yup'
import MobileHelper, { Mobile } from './MobileHelper'
import { isString } from 'formik'

interface SchemaMap {
  [key: string]: Yup.BaseSchema
}

interface ComplexSchema {
  schemaName: string
  fieldName: string
}

class Schema {
  private innerSchema!: SchemaMap

  public load(schemas: Array<string | ComplexSchema>) {
    return schemas.reduce((prev, current) => {
      let fieldName
      let schemaName
      if (isString(current)) {
        fieldName = current
        schemaName = current
      } else {
        fieldName = current.fieldName
        schemaName = current.schemaName
      }
      prev[fieldName] = this.innerSchema[schemaName]
      return prev
    }, {} as SchemaMap)
  }

  public async init() {
    this.innerSchema = {
      mobile: Yup.object()
        .shape({
          countryCode: Yup.string(),
          number: Yup.string(),
        })
        .test({
          message: I18n.t('schema.mobile.limit'),
          async test(value) {
            const countryCode = value.countryCode;
            if (!I18n.isValidCountryCode(countryCode)) {
              return false
            }
            return MobileHelper.isValid(value as Mobile)
          },
        })
        .required(
          I18n.t('errors.required', {
            name: I18n.t('schema.mobile.name'),
          })
        ),
      verificationCode: Yup.string().required(
        I18n.t('errors.required', {
          name: I18n.t('schema.verificationCode.name'),
        })
      ),
      password: Yup.string()
        .max(30, I18n.t('schema.password.limit'))
        .required(
          I18n.t('errors.required', {
            name: I18n.t('schema.password.name'),
          })
        ),
    }
  }
}

export default new Schema()

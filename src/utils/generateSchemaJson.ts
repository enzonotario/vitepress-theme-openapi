export function generateSchemaJson(schema: any) {
  return JSON.stringify(
      propertiesTypesJsonRecursive(schema),
      null,
      2,
  )
}

function propertiesTypesJsonRecursive(schema: any) {
  if (schema?.items) {
    return [propertiesTypesJsonRecursive(schema.items)]
  }

  if (!schema?.properties) {
    return schema
  }

  const propertiesKeys = Object.keys(schema.properties)

  const properties = {}

  propertiesKeys.forEach((key) => {
    const property = schema.properties[key]

    const { type } = property

    switch (type) {
      case 'string':
        properties[key] = 'string'
        break
      case 'number':
      case 'integer':
        properties[key] = 0
        break
      case 'boolean':
        properties[key] = true
        break
      case 'array':
        properties[key] = []
        break
      case 'object':
        properties[key] = {}
        break
      default:
        properties[key] = null
    }
  })

  return properties
}

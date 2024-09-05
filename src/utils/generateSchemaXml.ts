import xmlFormat from 'xml-formatter';

export function generateSchemaXml(schema: any, useExample = false): string {
  const xmlContent = propertiesTypesXmlRecursive(schema, useExample);
  return xmlFormat(`<root>${xmlContent}</root>`, {
    collapseContent: true,
  }).replace(/(\r\n|\n|\r)[ \t]*(\r\n|\n|\r)/gm, '$1') // Remove empty lines.
}

function propertiesTypesXmlRecursive(schema: any, useExample = false): string {
  if (schema?.items) {
    return `<item>${getPropertyValueXml(schema.items, useExample)}</item>`;
  }

  if (!schema?.properties) {
    return getPropertyValueXml(schema, useExample);
  }

  const propertiesKeys = Object.keys(schema.properties);
  let xmlString = '';

  propertiesKeys.forEach((key) => {
    const property = schema.properties[key];
    xmlString += `<${key}>${getPropertyValueXml(property, useExample)}</${key}>`;
  });

  return xmlString;
}

function getPropertyValueXml(property: any, useExample: boolean): string {
  const { type, example } = property;

  if (useExample && example) {
    return example;
  }

  switch (type) {
    case 'string':
      return 'string';
    case 'number':
    case 'integer':
      return '0';
    case 'boolean':
      return 'true';
    case 'array':
      if (property.items) {
        return `<item>${getPropertyValueXml(property.items, useExample)}</item>`;
      }
      return '';
    case 'object':
      if (property.properties) {
        return propertiesTypesXmlRecursive(property, useExample);
      }
      return '';
    default:
      return '';
  }
}
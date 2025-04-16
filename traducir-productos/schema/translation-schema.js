export const translationSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    description: { type: 'string' }
  },
  required: ['title', 'description'],
  additionalProperties: false
}
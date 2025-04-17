export const clasificationSchemaAnswers = {
  type: "object",
  properties: {
    urgencia: {
      type: "string",
      enum: ["alta", "media", "baja"]
    },
    tema: {
      type: "string"
    },
    equipo: {
      type: "string",
      enum: ["Facturación", "Asistencia usuarios", "Comercial"]
    },
    respuesta_usuario: {
      type: "string",
      description: "Una respuesta profesional, clara y amable para el usuario final."
    },
    respuesta_en_revision: {
      type: "string",
      description: "Una respuesta que indique que estamos revisando su problema e informe un tiempo medio de respuesta."
    }
  },
  required: ["urgencia", "tema", "equipo", "respuesta_usuario", "respuesta_en_revision"],
  additionalProperties: false
};
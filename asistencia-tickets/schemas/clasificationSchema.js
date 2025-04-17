export const clasificationSchema = {
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
    }
  },
  required: ["urgencia", "tema", "equipo"],
  additionalProperties: false
};
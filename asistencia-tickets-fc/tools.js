export const tools = [
  {
    type: "function",
    name: "get_subscription_renewal",
    description: "Consulta la fecha en la que se renovará la suscripción del usuario.",
    parameters: {
        type: "object",
        properties: {
            email: { type: "string" }
        },
        required: ["email"],
        additionalProperties: false
    },
    strict: true
  },
  {
    type: "function",
    name: "reset_password",
    description: "Resetea la contraseña del usuario y envía la nueva a su email.",
    parameters: {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "description": "Dirección de email del usuario"
        }
      },
      "required": ["email"],
      "additionalProperties": false
    },
    strict: true
  },
]
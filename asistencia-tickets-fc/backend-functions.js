export async function consultRenewal(email) {
  console.log(`Consultando la fecha de renovación de ${email}`);
  return "2025-07-15";
}

function esEmailValido(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}


export async function resetPassword(email) {
  if(esEmailValido(email)) {
    console.log(`Se ha reseteado la contraseña para ${email}`);
    return "Contraseña reseteada y correo enviado correctamente.";
  }
  console.log('email no es válido');
  return "Debes proporcionarnos un email válido para resetear tu clave";
}
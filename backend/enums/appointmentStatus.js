//appointmentStatus.js

const AppointmentStatus = Object.freeze({
    AGENDADA: "Agendada",
    SALA_ESPERA: "Sala de Espera",
    CONFIRMADA: "Confirmada",
    NO_CONFIRMADA: "No Confirmada",
    ATENDIDA: "Atendida",
    CANCELADA: "Cancelada",
    EXCEPCION: "Excepción"
  });

module.exports =  AppointmentStatus;
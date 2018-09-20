import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const clients = [
      {"_id":"5b94946395f40e109bf98099", "id":"5b94946395f40e109bf98099", "name":"Mahecha Diego", "clientSince": "2018-09-09T03:32:51.792Z","lastVisit":"2018-09-09T03:32:51.792Z","status":"A","person":{"personName":{"firstName":"Diego","lastName":"Mahecha"},"_id":"5b94946395f40e109bf98098","creationDate":"2018-09-09T03:32:51.165Z","idType":"CC","gender":"M","birthdate":"1981-09-21T00:00:00.000Z","phone":"3223513582","mobile":"3223513582","email":"diegohernando@gmail.com","v":0},"_v":0},
      {"_id":"5b94946395f40e109bf98098", "name":"Marin Juan", "clientSince": "2018-09-09T03:32:51.792Z","lastVisit":"2018-09-09T03:32:51.792Z","status":"A","person":{"personName":{"firstName":"Juan","lastName":"Marin"},"_id":"5b94946395f40e109bf98098","creationDate":"2018-09-09T03:32:51.165Z","idType":"CC","gender":"M","birthdate":"1981-09-21T00:00:00.000Z","phone":"3223513582","mobile":"3223513582","email":"diegohernando@gmail.com","v":0},"_v":0}

    ];

    const services = [
      {"_id":"5b95e37e5837d923570f4ed9","name":"Periodoncia","description":"Es el área que trata todo tipo de afecciones en los casos que involucran los tejidos del periodonto del diente, tales como encía, hueso y ligamento periodontal","averageTime":60,"v":0},
      {"_id":"5b9867144ec20b5fe11d52dc","name":"Endodoncia","description":"Es el área de la odontología que se estudia, previene y trata las enfermedades y alteraciones que comprometen los tejidos internos del diente (nervios) y sus relaciones con las estructuras que lo rodean.Gracias al diagnostico endodóntico que realizan con procedimientos clínicos y radiográficos, es posible determinar un pronóstico y enfocar un tratamiento adecuado para cada caso.","averageTime":90,"_v":0},
        { _id: 1, name: 'Valoracion', averageTime: 45 },
        { _id: 2, name: 'Limpieza', averageTime: 30  },
        { _id: 3, name: 'Diseno 1', averageTime: 60  },
        { _id: 4, name: 'Diseno B', averageTime: 60  }
    ];

    const appointments = [
      {"idAppointment":"27c45933-8b11-d89b-ece5-4a5ee05f77b5",
        "idSchedule":"5b9b35508365b87a63f45aee",
        "startTime":"2018-09-19T22:00:00.000Z",
        "endTime":"2018-09-19T22:00:00.000Z",
        "durationTime":60,
        "status":"Agendada",
        "client":"5b94946395f40e109bf98099",
        "professional":"5b986c2e6775906044a08d5e",
        "service":"5ba062d3906ef79c13e330cc",
        "title":"Rehabilitación Oral: Mahecha Diego"
      }
    ];

    return {clients: clients, services: services, appointments};
  }
}



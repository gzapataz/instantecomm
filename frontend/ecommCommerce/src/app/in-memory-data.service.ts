import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const services = [
      { id: 0, name: 'Blanqueamiento', averageTime: 60 },
      { id: 1, name: 'Valoracion', averageTime: 45 },
      { id: 2, name: 'Limpieza', averageTime: 30  },
      { id: 3, name: 'Diseno 1', averageTime: 60  },
      { id: 4, name: 'Diseno B', averageTime: 60  }
    ];
    return {services};
  }
}

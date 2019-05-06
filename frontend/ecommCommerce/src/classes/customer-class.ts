import {UUID} from "angular2-uuid";

export interface IPerson {
  _id: string,
  personName: string,
  personLastName: string,
  idType: string[],
  birthdate: Date,
  gender: String,
  phone: any,
  mobile: any,
  email: string,
  identication: string,
  address:string,
  channels: string
};

export class PersonName {
  firstName: string;
  lastName: string;
};

export class Person {
  _id: any;
  personName: PersonName;
  idType: string;
  birthdate: Date;
  gender: string;
  phone: any;
  mobile: any;
  email: string;
  identification: string;
  address:string;
  channels: string;
};


export interface ICustomer {
  id: string,
  name: string
  startTime: string,
  endTime: string,
  initialDate: Date,
  finalDate: Date,
  durationTime: number,
  status: string,
  clientId: string,
  professionalId: string,
  serviceId: number,
  title: string
};

export class CustomerClass {
  constructor() {
    this.name = this.person.personName.lastName + ' ' + this.person.personName.firstName;
  }
  _id: string;
  person: Person;
  name: string = this.person.personName.lastName + ' ' + this.person.personName.firstName;
  clientSince: Date;
  lastVisit: Date
  status: string;

}


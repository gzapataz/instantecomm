import {UUID} from "angular2-uuid";

export interface IAppointment {
  _id: string,
  idAppointment: string,
  idSchedule: string
  startTime: string,
  endTime: string,
  durationTime: number,
  status: string,
  client: string,
  clientName: string,
  professional: string,
  service: string,
  title: string
};

export class AppointmentClass implements IAppointment {
  constructor(public _id: string,
              public idAppointment: string,
              public idSchedule: string,
              public startTime,
              public endTime,
              public durationTime: number,
              public status: string,
              public client: string,
              public clientName: string,
              public professional: string,
              public service: string,
              public title: string) {
    this._id = _id;
    this.idAppointment = idAppointment;
    this.startTime = startTime;
    this.endTime = endTime;
    this.durationTime = durationTime;
    this.status = status;
    this.client = client;
    this.clientName = clientName;
    this.professional = professional;
    this.service = service;
    this.title = title;

  }
  eventColor: string;
}


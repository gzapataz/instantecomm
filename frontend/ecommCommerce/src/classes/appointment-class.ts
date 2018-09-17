import {UUID} from "angular2-uuid";

export interface IAppointment {
  id: string,
  startTime: string,
  endTime: string,
  initialDate: Date,
  finalDate: Date,
  durationTime: number,
  status: string,
  clientId: string,
  clientName: string,
  professionalId: string,
  serviceId: number,
  title: string
};

export class AppointmentClass implements IAppointment {
  constructor(public id: string,
              public startTime,
              public endTime,
              public initialDate: Date,
              public finalDate: Date,
              public durationTime: number,
              public status: string,
              public clientId: string,
              public clientName: string,
              public professionalId: string,
              public serviceId: number,
              public title: string) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.initialDate = initialDate;
    this.finalDate = finalDate;
    this.durationTime = durationTime;
    this.status = status;
    this.clientId = clientId;
    this.clientName = clientName;
    this.professionalId = professionalId;
    this.serviceId = serviceId;
    this.title = title;

  }

}

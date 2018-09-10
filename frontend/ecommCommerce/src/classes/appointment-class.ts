export interface IAppointment {
  id: string,
  startTime: string,
  endTime: string,
  initialDate: Date,
  finalDate: Date,
  durationTime: number,
  status: string,
  clientId: number,
  serviceId: number,
  description: string,
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
              public clientId: number,
              public serviceId: number,
              public title: string,
              public description: string) {
    this.id = id;
    this.startTime = startTime;
    this.endTime = endTime;
    this.initialDate = initialDate;
    this.finalDate = finalDate;
    this.durationTime = durationTime;
    this.status = status;
    this.clientId = clientId;
    this.serviceId = serviceId;
    this.description = description;
    this.title = title;

  }

}

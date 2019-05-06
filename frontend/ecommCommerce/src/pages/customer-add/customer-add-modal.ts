import {Component, OnInit, ViewChild } from '@angular/core';
import {
  AlertController,
  IonicPage,
  ModalController,
  NavController,
  NavParams,
  Platform,
  ViewController
} from 'ionic-angular';
import {Person} from "../../classes/customer-class";
import {LoggedProfessional} from "../../classes/logged-class";
import {CustomerAddServiceProvider} from "../../providers/customer-add-service/customer-add-service";
import {RestApiProvider} from '../../providers/countries-service/countries-service';
import {AlertmsgComponent} from "../../components/alertmsg/alertmsg";


//import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts/ngx';


@IonicPage()
@Component({
  selector: 'page-customer-add-modal',
  templateUrl: 'customer-add-modal.html',
})
export class CustomerAddModalPage implements OnInit {
  @ViewChild( AlertmsgComponent ) hijo: AlertmsgComponent;
  persona = {
    personName: {
      firstName: '',
      lastName: '',
    },
    //idType: null,
    //birthdate: null,
    //gender: null,
    phone: '',
    mobile: '',
    email: '',
    channels: 'WhatsApp',
    //identification: null,
    //address: null
  }

  codigo:string;

  contactPref = [ {code: 'WhatsApp', name: 'WhatsApp'},
                  {code:'Sms', name: 'Mensaje de Texto'},
                  {code:'Email', name: 'eMail'}];

  professional: LoggedProfessional;
  contactsfound = []

  channelWhatsApps = false

  person: Person;
  countries: any[];
  errorMessage: string;
  private alertm: any;


  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController,
              private customerAddServiceProvider: CustomerAddServiceProvider,
              private alertCtrl: AlertController, public rest: RestApiProvider,
              private modalCtrl: ModalController,
              private platform: Platform,
              //private contacts: Contacts
              ) {
  }

  ngOnInit() {
    this.professional = this.navParams.get('professional');
  //  console.log(this.professional);
    this.getCountries();
    this.codigo='57';
/*
    this.contacts.find(["displayName", "phoneNumbers"], {multiple: true}).then((contacts) => {
      this.contactsfound = contacts;
    })
*/
  }


  cancel() {
    this.viewCtrl.dismiss(this.person);
  }


  save() {

    // @ts-ignore
    // @ts-ignore
    this.person = this.persona;
    var subTitle;

    //console.log(this.person);
    console.log('this.person.personName.firstName' + this.person.personName.firstName);
    console.log('this.person.personName.lastName' + this.person.personName.lastName);
    console.log('this.person.mobile' + this.person.mobile);
    console.log('this.person.email' + this.person.email);

    if (!this.person.personName.firstName || !this.person.personName.lastName || !this.person.mobile || ( !this.person.email && this.person.channels == 'Email' )) {
      if (!this.person.email && this.person.channels == 'Email') {
        subTitle = 'El mail es obligatorio cuando se selecciona eMail en las notificaciones masivas'
      }
      else {
        subTitle = 'Revise los datos incompletos: Nombre, Apellido, Teléfono Celular '
      }
      let theAlert = this.alertCtrl.create({
        title: "Campos incompletos",
        subTitle: subTitle,
        buttons: ['OK']
      });
      theAlert.present();
    } else {

      if (!this.person.phone) {
        this.person.phone = "00";
      }

      this.person.mobile=this.codigo+this.persona.mobile;
      this.person.address
      this.customerAddServiceProvider.addACustomer(this.person, this.professional.userId).subscribe(data => {
        console.log('Datos Salvados:' + JSON.stringify(data));
        if (this.person.channels == 'WhatsApp') {
          console.log('DATA APP:' + this.person.channels)
          this.presentAlert(this.person, this.professional);
        }
        this.cancel();
      });
    }

  }

  async presentAlert(person, professional) {

    var messageWA = 'Buenas+tardes+Sr%28a%29%3A+' + person.personName['lastName'] + '%2C+este+mensaje+es+enviado+desde+el+consultorio+del+%28la%29+Dr%28a%29%3A+' + this.professional.jsonProfessional['person']['personName']['firstName'] + '+' + this.professional.jsonProfessional['person']['personName']['lastName'] +   '.++Por+este+medio+le+recordaremos+oportunamente+sus+citas+y%2Fo+procedimientos+programados.++Con+el+fin+de+activar+el+servicio%2C+por+favor+presione+sobre+el+siguiente+texto+en+azul%3A+https%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D85296231044%26text%3DRecibido';
    console.log('Alert-PERSON:' + JSON.stringify(person));
    console.log('Alert-PROF:' + JSON.stringify(professional.jsonProfessional));
    console.log('Alert-MSJ:' + messageWA);


    const alert = await this.alertCtrl.create({
      title: 'Autorización WhatsApp',
      message: '<div>' +
        '<p class="c-no-margin">Se ha seleccionado la opción de WhatsApp para las notificaciones masivas.' +
        'El paciente debe aceptar el envío de mensajes desde el número del servidor de OdontApp. Es necesario enviar desde su WhatsApp ' +
        'el mensaje con la autorización. Una vez el paciente acepte, podrá recibir mensajes automáticos. Presione el siguiente botón: ' +
        '<ion-buttons><button ion-button color="danger" small><a href=https://wa.me/' + person.mobile + '?text=' + messageWA  + '>Enviar WhatsApp</a></button><ion-buttons></p>' +
        '</div>',
      /*message:  'Se ha seleccionado la opción de WhatsApp para las notificaciones Masivas.' +
                'El paciente debe aceptar el envío de mensajes desde el número del servidor de OdontApp para eso es necesario enviar desde tu WhatsApp ' +
                'el mensaje con la autorización. Una vez el paciente acepte, podrá recibir mensajes automáticos ',*/
      buttons: ['Cancelar', {text: 'Enviado', handler: () => {
          console.log('hola')

        }
      }]
    });

    await alert.present();
  }

  onChangeTel(val) {
    if (this.codigo == '57' && val.length != 10 || this.codigo != '57' && val.length < 9 ) {
      let theAlert = this.alertCtrl.create({
        title: "Dígitos del Teléfono",
        subTitle: "El teléfono celular debe tener 10 dígitos",
        buttons: ['OK']
      });
      theAlert.present();
    }


    console.log('EVENTO' + JSON.stringify(val))
  }

  getCountries() {
    let countryAux: string[];
    this.rest.getCountries()
      .subscribe(

        countries => {   //console.log('Paises:' + JSON.stringify(countries));
                              this.countries = countries
                              console.log('this.countries :' + countryAux)
                          },
        error =>  this.errorMessage = <any>error);

  }

}

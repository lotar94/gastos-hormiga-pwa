import { Component, OnInit } from '@angular/core';
import { DocumentData, Firestore, Timestamp, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { DiarySpend } from 'src/app/models/diary_spend.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  currentDayIndex: number = 0;
  daysOfWeek: { dateFormatted: string; dayOfWeek: string; amount: number }[] = [];
  diarySpend:DiarySpend = {ammount: '', id: ''}

  listDiarySpend:any = []

  ammount = '';
  description = '';

  title = 'gastos-hormiga-pwa';

  showList:boolean = false;

  constructor(readonly firestore: Firestore  ) { }

  ngOnInit() {
    this.getExpensesForCurrentDay();
    this.getDaysOfWeek();
  }

  async getExpensesForCurrentDay() {
    this.diarySpend.ammount = await this.getExpensesForADay(this.formatDate(new Date())).then(result => result);
  }

  async getExpensesForADay(date:string): Promise<string> {
    return new Promise((resolve, reject) => {
      // Reference the 'test' collection in Firestore
      const itemCollection = collection(this.firestore, 'test');
    
      // Use a query to filter spending entries for the current day
      const querySnapshot = collectionData(
        query(itemCollection, where('date', '==', date))
      );
    
      // The 'querySnapshot' now contains the spending entries for the current day
      // You can process this data as needed.
      const total = querySnapshot.subscribe(res => {
        // Sumar los valores de 'ammount'
        console.log("RES ======> ",res);
        if (date === this.formatDate(new Date())) {
          this.listDiarySpend = res;
        }
        
        const totalMonto: number = res.reduce((total, entrada) => {
          const montoComoNumero = this.convertirANumero(entrada.ammount);

          // Si 'montoComoNumero' es un número válido, añadirlo al total; de lo contrario, ignorarlo
          if (!isNaN(montoComoNumero)) {
            return total + montoComoNumero;
          } else {
            return total;
          }
        }, 0);
        resolve(totalMonto.toString())
      })
    })
  }

  
  convertirANumero(valor: string): number {
    const formattedValue = valor.replace('.', '');
    return parseFloat(formattedValue);
  }

  public showModal():void {
    // Get the modal
    let modal = document.getElementById("myModal");

    if (modal != null) {
      modal.style.display = "block";  
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        if (modal != null) {
          modal.style.display = "none"
        }
      }
    }
    
  }

  public hideModal(){
    let modal = document.getElementById("myModal");

    if (modal != null) {
      modal.style.display = "none";  
    }
  }

  public goToList (id:string) {  
    this.showList = true;
  }

  public comeBack() {
    this.showList = false;
  }

  public saveSpending(ammount:string, description:string): void {
    if (this.ammount !== '' && this.description !== '') {
      const date = this.formatDate(new Date())
      const itemCollection = collection(this.firestore,"test");
      addDoc(itemCollection, {ammount, description, date})
      .then(res => {
        this.ammount = ''
        this.description = ''
        this.getExpensesForCurrentDay();
        this.getDaysOfWeek();
      })
      .catch(err => {
        console.error('Error al agregar documento: ', err);
      });
      this.hideModal();
    } else {
      console.error("FALTA INGRESAR LOS VALORES");
      
    }
  }

  public padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  
  public formatDate(date: Date) {
    return [
      this.padTo2Digits(date.getDate()),
      this.padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  








  private async getDaysOfWeek(): Promise<void> {
    this.daysOfWeek = [];
    const today = new Date();
    const dayOfWeek = today.getDay();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - dayOfWeek + i+1);
      const formattedDate = this.formatDate(date);
      const dayName = this.getDayName(i);
      const randomAmount =  await this.getExpensesForADay(formattedDate).then(result => result);
      this.daysOfWeek.push({ dateFormatted: formattedDate, dayOfWeek: dayName, amount: Number(randomAmount) });
    }
  }

  private getDayName(dayIndex: number): string {
    const daysOfWeek = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
    return daysOfWeek[dayIndex];
  }


}

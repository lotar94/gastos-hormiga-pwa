import { Component, OnInit } from '@angular/core';
import { Firestore, Query, addDoc, collection, collectionData, queryEqual } from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { DiarySpend } from 'src/app/models/diary_spend.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // items$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  // size$: BehaviorSubject<string|null>;

  constructor(readonly firestore: Firestore  ) { }

  ngOnInit(): void {
    this.getSpending();
  }

  async getSpending() {
    
    const itemCollection = collection(this.firestore, 'test');
    
    collectionData(itemCollection)

    // queryEqual(Query(itemCollection), Query())



    

  }

  diarySpend:DiarySpend = {ammount: '6.599', id: '1'}

  ammount = '';
  description = '';

  title = 'gastos-hormiga-pwa';

  showList:boolean = false;

  public showModal():void {
    console.log("llega");
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
    console.log("goToList", id);
    this.showList = true;
  }

  public comeBack() {
    this.showList = false;
  }

  public saveSpending(ammount:string, description:string): void {
    if (this.ammount !== '' && this.description !== '') {
      console.log("El valor ingresado es => ", ammount);
      console.log("La descripción es => ", description);
      const date = this.formatDate(new Date())
      console.log("date ========>", date);
      
      const itemCollection = collection(this.firestore,"test");
      addDoc(itemCollection, {ammount, description, date})
      .then(res => {
        console.log('Documento agregado con ID: ', res.id);
        this.ammount = ''
        this.description = ''
      })
      .catch(err => {
        console.error('Error al agregar documento: ', err);
      });
      this.hideModal();
    } else {
      console.log("FALTA INGRESAR LOS VALORES");
      
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
}

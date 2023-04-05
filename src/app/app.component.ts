import { Component, inject } from '@angular/core';
import { DiarySpend } from './models/diary_spend.model';
import { Observable } from 'rxjs';
import { Firestore, addDoc, collectionData, collectionGroup, collectionSnapshots } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  // firestore: Firestore = inject(Firestore);
  constructor(readonly firestore: Firestore  ) { }



  diarySpend:DiarySpend = {ammount: '6.599', id: '1'}

  ammount: any;
  description: any;

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

  public goToList (id:string) {
    console.log("goToList", id);
    this.showList = true;
  }

  public comeBack() {
    this.showList = false;
  }

  public saveSpending(ammount:number, description:string): void {
    console.log("El valor ingresado es => ", ammount);
    console.log("La descripción es => ", description);
    
    const itemCollection = collection(this.firestore,"test");
    addDoc(itemCollection, {ammount, description})
    .then(res => {
      console.log('Documento agregado con ID: ', res.id);
    })
    .catch(err => {
      console.error('Error al agregar documento: ', err);
    });
    this.showModal();
    //TODO crear conexion con la db firebase
    
    // console.log(collection(this.firestore, "test"));
  }
  // Get a list of cities from your database

}

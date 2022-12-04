import { Component } from '@angular/core';
import { DiarySpend } from './models/diary_spend.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  diarySpend:DiarySpend = {ammount: '6.599', id: '1'}

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
}

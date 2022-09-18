import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  diarySpend:number = 6.599;

  title = 'gastos-hormiga-pwa';

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
}

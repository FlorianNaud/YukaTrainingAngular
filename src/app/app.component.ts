import { Component,  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foodInfo';


  ngOnInit(): void {
    this.user()
    console.log(this.user())

  }
  user(): any {
    return localStorage.getItem('user');

  }
  logout(){
    localStorage.clear()
  }
}

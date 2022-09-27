import { Component,  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'foodInfo';
  username = localStorage.getItem('user');

  ngOnInit(): void {
    this.user()
    console.log(this.user())

  }
  user(): any {
    this.username = localStorage.getItem('user');
    return localStorage.getItem('user');
  }
  logout(){
    localStorage.clear()
  }
}

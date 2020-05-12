import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  selectedMenuItem: string = 'recipes';

  onChangeSelectedMenuItem(menuItem: string): void {
    this.selectedMenuItem = menuItem;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Output('onSelectMenuItem') selectedMenuItem = new EventEmitter<string>();

  onSelect(item: string) {
    this.selectedMenuItem.emit(item);
  }
}

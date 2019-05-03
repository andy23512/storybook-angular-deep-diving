import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <inbox-screen></inbox-screen>
  `,
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'taskbox';
}

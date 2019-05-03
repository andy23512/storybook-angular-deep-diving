import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { TaskComponent } from './components/task.component';
import { TaskListComponent } from './containers/task-list.component';
import { PureTaskListComponent } from './components/pure-task-list.component';
import { TasksState } from './state/task.state';
import { PureInboxScreenComponent } from './components/pure-inbox-screen.component';
import { InboxScreenComponent } from './containers/inbox-screen.component';

@NgModule({
  imports: [CommonModule, NgxsModule.forFeature([TasksState])],
  exports: [
    TaskComponent,
    TaskListComponent,
    PureInboxScreenComponent,
    InboxScreenComponent
  ],
  declarations: [
    TaskComponent,
    TaskListComponent,
    PureTaskListComponent,
    PureInboxScreenComponent,
    InboxScreenComponent
  ],
  providers: []
})
export class TaskModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CellComponent } from './cell/cell.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { PublicComponent } from './public/public.component';
import { VerseService } from 'src/app/services';
import { AssistanceComponent } from './assistance/assistance.component';
import { ModalManualComponent } from './cell/modal-manual/modal-manual.component';

@NgModule({
  declarations: [
    AdminComponent,
    CellComponent,
    WelcomeComponent,
    PublicComponent,
    AssistanceComponent,
    ModalManualComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ComponentsModule, MatTableModule],
})
export class AdminModule {}

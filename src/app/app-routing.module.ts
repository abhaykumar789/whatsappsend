import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadComponent } from './upload/upload.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'upload', component: UploadComponent },
  { path: 'view', component: ViewComponent },
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

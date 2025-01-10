import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../service/excel-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  file: File | null = null;
  message: string = '';
  uniqueFileNames: string[] = []; // List of unique file names

  constructor(private excelService: ExcelService,private router: Router) {}

  ngOnInit(): void {
    this.refreshFileNames(); // Load unique file names on component initialization
  }

  onFileSelected(event: any): void {
    this.file = event.target.files[0];
  }

  uploadFile(): void {
    if (this.file) {
      this.excelService.uploadExcel(this.file).subscribe({
        next: (response) => {
          this.message = response;
          this.refreshFileNames(); // Refresh file names after successful upload
        },
        error: (err) => (this.message = 'Error: ' + err.error),
      });
    }
  }

  refreshFileNames(): void {
    this.excelService.getUniqueFileNames().subscribe({
      next: (fileNames) => (this.uniqueFileNames = fileNames),
      error: (err) => (this.message = 'Error fetching file names: ' + err.error),
    });
  }

  openFile(fileName: string): void {
    this.router.navigate(['/view'], { queryParams: { fileName } });
  }

}

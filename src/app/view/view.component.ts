import { Component, OnInit } from '@angular/core';
import { ExcelData } from '../model/excel-data';
import { ExcelService } from '../service/excel-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  uniqueFileName: string = '';
  excelData: ExcelData[] = [];
  extraKeys: string[] = [];
  fetched = false;

  constructor(private excelService: ExcelService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.uniqueFileName = params['fileName'] || '';
      if (this.uniqueFileName) {
        this.fetchData();
      }
    });
  }

  fetchData(): void {
    if (this.uniqueFileName.trim()) {
      this.excelService.getDataByUniqueFileName(this.uniqueFileName).subscribe({
        next: (data) => {
          this.excelData = data;
          this.fetched = true;

          // Collect all unique extraField keys
          if (this.excelData.length) {
            this.extraKeys = Object.keys(this.excelData[0].extraFields);
          }
        },
        error: () => {
          this.excelData = [];
          this.extraKeys = [];
          this.fetched = true;
        },
      });
    }
  }
}

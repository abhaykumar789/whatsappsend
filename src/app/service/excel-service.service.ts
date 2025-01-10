import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExcelData } from '../model/excel-data';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  private baseUrl = 'http://localhost:8080/api/excel'; // Change if backend URL differs

  constructor(private http: HttpClient) {}

  uploadExcel(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/upload`, formData, {
      responseType: 'text',
    });
  }

  getDataByUniqueFileName(uniqueFileName: string): Observable<ExcelData[]> {
    return this.http.get<ExcelData[]>(`${this.baseUrl}/data/${uniqueFileName}`);
  }

  getUniqueFileNames(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/uniqueFileNames`);
  }
}

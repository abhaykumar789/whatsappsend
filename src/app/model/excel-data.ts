export interface ExcelData {
    id: number;
    name: string;
    email: string;
    address: string;
    mobile1: string;
    mobile2?: string;
    mobile3?: string;
    mobile4?: string;
    mobile5?: string;
    uniqueFileName: string;
    extraFields: { [key: string]: string }; // Dynamic fields
  }
  
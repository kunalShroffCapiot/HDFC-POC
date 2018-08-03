export class ApiResponse {
  status: number;
  message: string;
  data: any;

  constructor() {
    this.status = null;
    this.message = null;
    this.data = null;
  }
}

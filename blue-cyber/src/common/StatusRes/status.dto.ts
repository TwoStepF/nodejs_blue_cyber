export class Status {
    constructor(status: any, message: any, data: any){
        this.message =  message;
        this.status = status;
        this.data =  data;
    }
    message: any;
    status: any;
    data: string;
}
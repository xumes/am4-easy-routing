export class NotFoundError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'NotFoundError';
      this.date = new Date();
    }
  
    date: Date;
}
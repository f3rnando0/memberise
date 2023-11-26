interface response_error extends Error {
  status?: number;
}

export class custom_error extends Error implements response_error {
  status?: number | undefined;
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(status: number | undefined, message: string, name: string) {
    super(message);
    this.message = message;
    this.status = status;
    this.name = name;
  }
}

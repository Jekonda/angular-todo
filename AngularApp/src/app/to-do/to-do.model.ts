export class ToDo {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  deadLine: Date;

  constructor(title: string, description: string, deadLine: Date, id?: number, isDone?: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.deadLine = deadLine;
    this.isDone = isDone;
  }

}

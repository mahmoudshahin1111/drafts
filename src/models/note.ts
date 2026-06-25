export class Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    title,
    content,
    updatedAt,
    createdAt,
  }: {
    id?: string;
    title: string;
    content: string;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    this.id = id ?? crypto.randomUUID();
    this.title = title;
    this.content = content;
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

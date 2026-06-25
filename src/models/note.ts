export class Note {
  id: string;
  title: string;
  content: string;

  constructor(title: string, content: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.content = content;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
    };
  }
}

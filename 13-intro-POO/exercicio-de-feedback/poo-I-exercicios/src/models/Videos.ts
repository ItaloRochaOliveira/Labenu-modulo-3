export class Video {
  constructor(
    private id: string,
    private title: string,
    private duration: number,
    private createdAt: string
  ) {}

  get(att: string): any {
    switch (att) {
      case "id":
        return this.id;
      case "title":
        return this.title;
      case "duration":
        return this.duration;
      case "created_at":
        return this.createdAt;
    }
  }

  setId(newId: string) {
    this.id = newId;
  }

  setTitle(newTitle: string) {
    this.title = newTitle;
  }

  setDuration(newDuration: number) {
    this.duration = newDuration;
  }

  setCreatedAt(newCreatedAt: string) {
    this.createdAt = newCreatedAt;
  }
}

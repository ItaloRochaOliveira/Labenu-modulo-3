export class Video {
  constructor(
    private id: string,
    private title: string,
    private duration: number,
    private createdAt: string
  ) {}

  get _id(): string {
    return this.id;
  }

  get _title(): string {
    return this.title;
  }

  get _duration(): number {
    return this.duration;
  }

  get _createdAt(): string {
    return this.createdAt;
  }

  set _id(value: string) {
    this.id = value;
  }

  set _title(value: string) {
    this.title = value;
  }

  set _duration(value: number) {
    this.duration = value;
  }

  set _createdAt(value: string) {
    this.createdAt = value;
  }

  // get(att: string): any {
  //   switch (att) {
  //     case "id":
  //       return this.id;
  //     case "title":
  //       return this.title;
  //     case "duration":
  //       return this.duration;
  //     case "created_at":
  //       return this.createdAt;
  //   }
  // }

  // setId(newId: string) {
  //   this.id = newId;
  // }

  // setTitle(newTitle: string) {
  //   this.title = newTitle;
  // }

  // setDuration(newDuration: number) {
  //   this.duration = newDuration;
  // }

  // setCreatedAt(newCreatedAt: string) {
  //   this.createdAt = newCreatedAt;
  // }
}

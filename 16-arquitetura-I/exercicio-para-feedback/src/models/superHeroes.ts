import { get } from "http";

export class SuperHeroes {
  constructor(
    private id: string,
    private name: string,
    private power: string,
    private createdAt: string,
    private category: string
  ) {}

  get _id(): string {
    return this.id;
  }

  get _name(): string {
    return this.name;
  }

  get _power(): string {
    return this.power;
  }

  get _createdAt(): string {
    return this.createdAt;
  }

  public get _category(): string {
    return this.category;
  }

  set _id(value: string) {
    this.id = value;
  }

  set _name(value: string) {
    this.name = value;
  }

  set _power(value: string) {
    this.power = value;
  }

  set _createdAt(value: string) {
    this.createdAt = value;
  }
}

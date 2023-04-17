export class Account {
  constructor(
    private id: string,
    private ownerId: string,
    private balance: number,
    private createAt: string
  ) {}
}

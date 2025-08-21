export class Place {
  public readonly id: string;
  public readonly name: string;
  public readonly latitude: number;
  public readonly longitude: number;
  public readonly createdAt: Date = new Date();
}

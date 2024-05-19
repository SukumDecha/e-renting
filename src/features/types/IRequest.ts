export interface IRequest {
  id: number;
  itemId: number;
  itemAmount: number;
  requestBy: string;
  status: "PENDING" | "APPROVE" | "DENY";
}

export interface PrismaUser {
  __typename: String;
  id: String;
  email: String;
  bots: any;
}
export interface Bot {
  id: number;
  fillPercent: number;
  __typename?: string;
}

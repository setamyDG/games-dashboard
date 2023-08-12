export type ListQuery = {
  searchText?: string;
  current: number;
  pageSize: number;
  orderBy?: string;
  platforms?: string;
};

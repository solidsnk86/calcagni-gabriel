export type GetProps = {
  table: string;
  column: string;
};

export type CreateProps = {
  table: string;
  content: string;
  onCreate: () => Promise<void>;
};

export type UpdateProps = {
  id: string | number;
  content: string;
};

export type DeleteProps = {
  table: string;
  id: string | number;
  onDelete: () => Promise<void>;
};

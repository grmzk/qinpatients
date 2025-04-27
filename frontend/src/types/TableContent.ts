type ContentDataExtends = Record<string, string | number | boolean>;

export type ContentOfTableContent<ContentData extends ContentDataExtends> = {
  data: ContentData;
  classList?: string[];
  onClick?: () => void;
};

export type TableContent<ContentData extends ContentDataExtends> = {
  head: Record<string, keyof ContentData>;
  content: ContentOfTableContent<ContentData>[];
};

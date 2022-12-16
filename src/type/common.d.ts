export type TranslatableAttribute = {
  labelId: string;
  value: string;
  isDefault?: boolean
  code?: string;
}

export type File = {
  uri: string;
  filename: string;
  mimetype: string;
  encoding: string;
  type: string;
};

export type Target = {
  files: FileList | null;
  value: any;
};
import { Meta } from 'ssc-parser';

export interface Song extends Meta {
  label: string;
}

export const getLabelFromMeta = (meta: Meta): string => {
  return `${meta.ARTIST} - ${meta.TITLE}`;
};

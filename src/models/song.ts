import { Meta, Parse } from 'ssc-parser';

export interface Song extends Parse {
  label: string;
}

export const getLabelFromMeta = (meta: Meta): string => {
  return `${meta.ARTIST} - ${meta.TITLE}`;
};

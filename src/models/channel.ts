import { Song } from './song';

export interface Channel {
  name: string;
  songs: Array<Song>;
}

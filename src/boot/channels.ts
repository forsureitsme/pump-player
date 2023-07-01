import { boot } from 'quasar/wrappers';
import { readFileSync, readdirSync } from 'fs';
import { Parse, parseSSC } from 'ssc-parser';
import { Channel } from '../models/channel';
import { Song, getLabelFromMeta } from '../models/song';
import { useChannelsStore } from 'src/stores/channels';

export default boot(({ store }) => {
  const songsFolderPath = './public/songs';
  const songsFolderContents = readdirSync(songsFolderPath, {
    withFileTypes: true,
  });
  const channels = songsFolderContents
    .filter((item) => item.isDirectory())
    .reduce((carry, item) => {
      const channel: Channel = {
        name: item.name,
        songs: Array<Song>(),
      };

      const channelFolderContents = readdirSync(
        `${songsFolderPath}/${channel.name}`,
        {
          withFileTypes: true,
        }
      );

      const songFolders = channelFolderContents.filter((item) =>
        item.isDirectory()
      );

      for (const songFolder of songFolders) {
        const songFolderContents = readdirSync(
          `${songsFolderPath}/${channel.name}/${songFolder.name}`,
          {
            withFileTypes: true,
          }
        );

        const song = songFolderContents.find((item) =>
          item.name.endsWith('.ssc')
        );

        if (!song) {
          continue;
        }

        const sscFile = readFileSync(
          `${songsFolderPath}/${channel.name}/${songFolder.name}/${song.name}`,
          {
            encoding: 'utf-8',
          }
        );

        let ssc: Parse | null;
        try {
          ssc = parseSSC(sscFile);
        } catch (e) {
          console.info(song.name);
          console.error(e);
          continue;
        }

        channel.songs.push({
          ...ssc,
          label: getLabelFromMeta(ssc.header),
        });
      }

      if (!channel.songs.length) {
        return carry;
      }

      channel.songs = channel.songs.sort((a, b) =>
        a.label.localeCompare(b.label)
      );

      return [...carry, channel];
    }, Array<Channel>())
    .sort((a, b) => a.name.localeCompare(b.name));

  const channelsStore = useChannelsStore(store);
  channelsStore.channels = channels;
});

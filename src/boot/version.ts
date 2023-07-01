import { spawnSync } from 'child_process';
import { boot } from 'quasar/wrappers';
import { useAppStore } from 'src/stores/app';

export default boot(async ({ store }) => {
  const appStore = useAppStore(store);
  appStore.commits = spawnSync('git', [
    'rev-list',
    'HEAD',
    '--count',
  ]).stdout.toString();
  appStore.hash = spawnSync('git', [
    'rev-parse',
    '--short',
    'HEAD',
  ]).stdout.toString();
});

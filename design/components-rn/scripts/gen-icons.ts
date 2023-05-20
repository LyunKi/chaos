import fs from 'fs-extra';
import { generateIconsForSourceDir } from './gen-icon-assets';
import { generateIndexForSourceDir } from './gen-icon-registry';

main('./src/icon/registry');

function main(destDir: string) {
  fs.removeSync(destDir);
  fs.ensureDirSync(destDir);

  generateIconsForSourceDir('./assets/fill', destDir);
  generateIconsForSourceDir('./assets/outline', destDir);

  generateIndexForSourceDir(destDir);
}

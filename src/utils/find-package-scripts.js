import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export function findAllPackageScripts(workspacePath, timeout = 4000) {
  const found = [];
  const startTime = Date.now();

  function searchRecursive(dir) {
    if (Date.now() - startTime > timeout) return;

    try {
      const entries = readdirSync(dir);

      for (const entry of entries) {
        if (Date.now() - startTime > timeout) break;

        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (entry === 'package.json') {
          try {
            const pkg = JSON.parse(readFileSync(fullPath, 'utf8'));

            // Scripts
            Object.entries(pkg.scripts || {}).forEach(([name, command]) => {
              found.push({
                type: 'script',
                name,
                command,
                packagePath: fullPath,
                relativePath: fullPath.replace(workspacePath, '.')
              });
            });

            // Bins
            const bins = pkg.bin || {};
            const binEntries = typeof bins === 'string' 
              ? { [pkg.name]: bins } 
              : bins;

            Object.entries(binEntries).forEach(([name, path]) => {
              found.push({
                type: 'bin',
                name,
                path,
                packagePath: fullPath,
                relativePath: fullPath.replace(workspacePath, '.')
              });
            });
          } catch (err) {
            console.error(`Error reading package.json at ${fullPath}:`, err);
          }
        }

        if (stat.isDirectory() && !entry.startsWith('.') && entry !== 'node_modules') searchRecursive(fullPath);
      }
    } catch (err) {
      console.error(`Error reading directory ${dir}:`, err);
    }
  }

  searchRecursive(workspacePath);
  return found;
}
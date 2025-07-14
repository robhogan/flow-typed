/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 * @format
 */

declare module 'memfs' {
  import typeof FS from 'node:fs';
  import typeof {sep as PathSep} from 'node:path';

  type DirectoryJSON = {
    [filePath: string]: string | Buffer | null,
  };

  type NestedDirectoryJSON = {
    [basename: string]: string | Buffer | NestedDirectoryJSON,
  };

  declare class MemFSVolumeMethods {
    static fromJSON(json: DirectoryJSON, cwd?: string): Volume;
    static fromNestedJSON(json: NestedDirectoryJSON, cwd?: string): Volume;

    fromJSON(json: DirectoryJSON, cwd?: string): void;
    fromNestedJSON(json: NestedDirectoryJSON, cwd?: string): void;
    toTree(opts?: $ReadOnly<{separator: PathSep}>): string;
    reset(): void;
  }

  export type Volume = MemFSVolumeMethods &
    Omit<FS, 'constants' | 'F_OK' | 'R_OK' | 'W_OK' | 'X_OK'>;

  declare module.exports: {
    Volume: Class<Volume>,
    fs: FS,
    vol: Volume,
    memfs: () => {fs: FS, vol: Volume},
    createFsFromVolume: (volume: Volume) => FS,
  };
}

/* eslint-disable @typescript-eslint/naming-convention */
export default {
    // Check formatting for the files we're given
    '*': 'npm run format',
    // If any source file changes, validate all source files for simplicity
    'src/*': (files) => {
        return [
            `npm run quality_glob ${files.join(' ')}`,
            `tsc -p tsconfig.json`,
            `npm run testonce`,
        ];
    },
    'package.json': 'npm run packagejson',
};

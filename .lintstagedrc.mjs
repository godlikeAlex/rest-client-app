export default {
  '*/**/*.{ts,tsx}': [
    'prettier -w -l -u',
    'eslint --fix',
    () => 'tsc -p ./tsconfig.json --noEmit ',
  ],
};

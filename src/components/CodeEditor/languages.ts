export const LANGUAGES = {
  javascript: async () =>
    (await import('@codemirror/lang-javascript')).javascript,
  json: async () => (await import('@codemirror/lang-json')).json,
  html: async () => (await import('@codemirror/lang-html')).html,
  go: async () => (await import('@codemirror/lang-go')).go,
  java: async () => (await import('@codemirror/lang-java')).java,
  csharp: async () => (await import('@replit/codemirror-lang-csharp')).csharp,
  python: async () => (await import('@codemirror/lang-python')).python,
  php: async () => (await import('@codemirror/lang-php')).php,
} as const;

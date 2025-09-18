export default function replaceLanguage(url: string, language: string) {
  return url.replace(/^\/[a-z]{2}(?=\/|$)/, `/${language}`);
}

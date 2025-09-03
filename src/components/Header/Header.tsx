import { Link } from 'react-router';

import i18next from '@/app/i18n';

export default function Header() {
  return (
    <>
      {i18next.supportedLngs.map((language) => (
        <Link to={`/${language}`} key={language}>
          {language}
        </Link>
      ))}
    </>
  );
}

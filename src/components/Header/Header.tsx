import { Link } from 'react-router';

import i18next from '@/app/i18n';
import { Button } from '@mantine/core';

export default function Header() {
  return (
    <>
      {i18next.supportedLngs.map((language) => (
        <Button component={Link} to={`/${language}`} key={language}>
          {language}
        </Button>
      ))}
    </>
  );
}

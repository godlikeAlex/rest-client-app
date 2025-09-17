import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface Props extends ComponentProps<typeof Link> {
  to: string;
}

export default function LocaleLink({ to, ...props }: Props) {
  const { i18n } = useTranslation();

  return (
    <Link to={to.startsWith('/') ? `/${i18n.language}${to}` : to} {...props} />
  );
}

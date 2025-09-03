import { Outlet, redirect } from 'react-router';
import i18n from '../i18n';
import type { Route } from './+types/locale';
import { useChangeLanguage } from 'remix-i18next/react';

export async function loader({ params: { locale } }: Route.LoaderArgs) {
  if (!i18n.supportedLngs.includes(locale)) {
    return redirect(`/${i18n.fallbackLng}`);
  }
}

export default function LocaleWrapper({
  params: { locale },
}: Route.ComponentProps) {
  useChangeLanguage(locale);

  return <Outlet />;
}

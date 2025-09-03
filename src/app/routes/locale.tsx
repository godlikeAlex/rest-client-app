import { redirect } from 'react-router';
import i18n from '../i18n';
import type { Route } from './+types/locale';

export async function loader({ params }: Route.LoaderArgs) {
  if (!i18n.supportedLngs.includes(params.locale)) {
    return redirect(`/${i18n.fallbackLng}`);
  }
}

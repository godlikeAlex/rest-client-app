import { Badge } from '@mantine/core';

interface Props {
  status: string | number;
  variant?: 'light' | 'filled';
}

const STATUS_COLORS: Record<string, string> = {
  200: 'green',
  201: 'green',
  202: 'green',
  204: 'green',

  301: 'blue',
  302: 'blue',
  304: 'blue',

  400: 'orange',
  401: 'orange',
  403: 'orange',
  404: 'red',
  405: 'orange',
  408: 'orange',
  409: 'orange',
  410: 'red',
  429: 'orange',

  500: 'red',
  501: 'red',
  502: 'red',
  503: 'red',
  504: 'red',
  505: 'red',
};

export default function HttpStatusBadge({ variant = 'light', status }: Props) {
  const color = STATUS_COLORS[status] ?? 'gray';

  return (
    <Badge color={color} radius="sm" size="lg" variant={variant}>
      {status}
    </Badge>
  );
}

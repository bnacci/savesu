import { InertiaSharedProps } from '@typed';
import { usePage } from '@inertiajs/react';

export default function useTypedPage<T = {}>() {
  return usePage<InertiaSharedProps<T>>();
}

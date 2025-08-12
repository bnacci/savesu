import { InertiaSharedProps } from '@base/types';
import { usePage } from '@inertiajs/react';

export default function useTypedPage<T = {}>() {
  return usePage<InertiaSharedProps<T>>();
}

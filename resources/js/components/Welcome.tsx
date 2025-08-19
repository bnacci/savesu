import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';

import ApplicationLogo from '@components/logo';
import React from 'react';
import { coinsFormatted } from '@lib/utils';
import useTypedPage from '@hooks/useTypedPage';

export default function Welcome() {
  const {
    props: { locale },
  } = useTypedPage();
  return (
    <div>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-zinc-900 text-white rounded-2xl flex-col flex p-5 py-7">
          <span className="mb-3 uppercase text-xs font-medium">
            Available UCoins
          </span>
          <div className="flex items-end mb-1">
            <span className="text-3xl font-bold before:content-['$U'] before:opacity-30 before:text-xl before:mr-1 before:font-normal">
              {coinsFormatted(154788.58, locale)}
            </span>

            <div className="flex gap-x-2 items-center text-emerald-500 text-sm font-normal ml-3">
              <IconTrendingUp size={16} />
              <span>15%</span>
            </div>
          </div>
          <small className="opacity-50">
            you received {coinsFormatted(0.847, locale)} ucoins last month
          </small>
        </div>

        <div className="bg-zinc-900 text-white rounded-2xl flex-col flex p-5 py-7">
          <span className="mb-3 uppercase text-xs font-medium">Blog views</span>
          <div className="mb-1">
            <div className="flex items-end">
              <div>
                <span className="text-3xl font-bold">
                  {Intl.NumberFormat(locale, {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(87455815)}
                </span>
                <span className="ml-3 opacity-30 text-xl font-normal select-none pointer-events-none">
                  views
                </span>
              </div>
              <div className="flex gap-x-2 items-center text-red-400 text-sm font-normal ml-3">
                <IconTrendingDown size={16} className="-rotate-y-[180deg]" />
                <span>15%</span>
              </div>
            </div>
          </div>
          <small className="opacity-50">
            you received{' '}
            {Intl.NumberFormat(locale, {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(4571)}{' '}
            views last month
          </small>
        </div>

        <div className="bg-zinc-900 text-white rounded-2xl flex-col flex p-5 py-7">
          <span className="mb-3 uppercase text-xs font-medium flex items-start justify-between">
            Your followers
            <div className="self-end *:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:size-5">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/leerob.png"
                  alt="@leerob"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
            </div>
          </span>
          <div className="mb-1">
            <div className="flex items-end">
              <div>
                <span className="text-3xl font-bold">
                  {Intl.NumberFormat(locale, {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(484512)}
                </span>
                <span className="ml-3 opacity-30 text-xl font-normal select-none pointer-events-none">
                  followers
                </span>
              </div>
              <div className="flex gap-x-2 items-center text-emerald-500 text-sm font-normal ml-3">
                <IconTrendingUp size={16} />
                <span>5%</span>
              </div>
            </div>
          </div>
          <small className="opacity-50">
            you gained{' '}
            {Intl.NumberFormat(locale, {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(487)}{' '}
            followers last month
          </small>
        </div>

        <div className="bg-zinc-900 text-white rounded-2xl flex-col flex p-5 py-7">
          <span className="mb-3 uppercase text-xs font-medium">Reactions</span>
          <div className="mb-1">
            <div className="flex items-end">
              <div>
                <span className="text-3xl font-bold">
                  {Intl.NumberFormat(locale, {
                    notation: 'compact',
                    compactDisplay: 'short',
                  }).format(15844)}
                </span>
                <span className="ml-3 opacity-30 text-xl font-normal select-none pointer-events-none">
                  reactions
                </span>
              </div>
              <div className="flex gap-x-2 items-center text-red-400 text-sm font-normal ml-3">
                <IconTrendingDown size={16} className="-rotate-y-[180deg]" />
                <span>25%</span>
              </div>
            </div>
          </div>
          <small className="opacity-50">
            you gained{' '}
            {Intl.NumberFormat(locale, {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(89)}{' '}
            reactions last month
          </small>
        </div>
      </div>
    </div>
  );
}

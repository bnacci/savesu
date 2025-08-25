import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { cn, nl2br } from '@lib/utils';

import Microlink from '@microlink/react';
import React from 'react';

const extractLinks = (text: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

const classifyLink = (url: string): 'image' | 'document' | 'website' => {
  const lowerUrl = url.toLowerCase();

  if (/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(lowerUrl)) {
    return 'image';
  } else if (/\.(pdf|docx?|xlsx?|pptx?)$/i.test(lowerUrl)) {
    return 'document';
  } else {
    return 'website';
  }
};

const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, i) =>
    urlRegex.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline wrap-break-word"
      >
        {part}
      </a>
    ) : (
      nl2br(part)
    ),
  );
};

const LinkPreviewer = ({ text }: { text: string }) => {
  const links = Array.from(new Set(extractLinks(text)));

  return (
    <div className="flex flex-col gap-2">
      <ImagePreview links={links} />
      <DocumentPreview links={links} />
      <LinkPreview links={links} />

      {/* Texto com links clicáveis abaixo */}
      <p>{renderTextWithLinks(text)}</p>
    </div>
  );
};

type Links = { links: string[] };

function ImagePreview({ links }: Links) {
  const imageLinks = links.filter(link => classifyLink(link) === 'image');
  const imageLinksSliced = imageLinks.slice(0, 4);

  return (
    imageLinksSliced.length > 0 &&
    (imageLinksSliced.length > 1 ? (
      <div
        className={cn('grid gap-1', {
          'grid-cols-2': imageLinksSliced.length > 1,
          'grid-rows-2': imageLinksSliced.length >= 3,
        })}
      >
        {imageLinksSliced.map((image, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${image})` }}
            className={cn(
              'overflow-hidden relative cursor-pointer max-w-full rounded-lg h-auto bg-center bg-cover bg-no-repeat',
              {
                'col-span-1 row-span-2 h-full':
                  index === 0 && imageLinksSliced.length === 3,
                'h-80': imageLinksSliced.length === 2,
              },
            )}
          >
            {imageLinksSliced.length >= 4 &&
              index === imageLinksSliced.slice(0, 4).length - 1 && (
                <div className="absolute flex items-center justify-center text-white top-0 left-0 right-0 bottom-0 bg-black/30 select-none">
                  <span className="font-medium before:content-['+'] text-2xl before:mr-1">
                    {imageLinks.slice(4).length}
                  </span>
                </div>
              )}
          </div>
        ))}
      </div>
    ) : (
      <img
        src={imageLinksSliced[0]}
        alt="preview"
        className="max-w-full h-auto rounded-lg cursor-pointer "
      />
    ))
  );
}

function DocumentPreview({ links }: Links) {
  const documentLinks = links.filter(link => classifyLink(link) === 'document');
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    documentLinks.length > 0 &&
    (documentLinks.length > 1 ? (
      <Carousel setApi={setApi}>
        <CarouselContent>
          {documentLinks.map((link, index) => (
            <CarouselItem key={index}>
              <iframe
                src={`https://docs.google.com/gview?url=${link}&embedded=true`}
                style={{ width: '100%', height: '500px' }}
                title="Document Viewer"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {current !== 1 && <CarouselPrevious className="left-4" />}
        {current < documentLinks.length && <CarouselNext className="right-4" />}
      </Carousel>
    ) : (
      <iframe
        src={`https://docs.google.com/gview?url=${documentLinks[0]}&embedded=true`}
        style={{ width: '100%', height: '500px' }}
        title="Document Viewer"
      />
    ))
  );
}

function LinkPreview({ links }: Links) {
  const websiteLinks = links.filter(link => classifyLink(link) === 'website');
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    websiteLinks.length > 0 &&
    (websiteLinks.length > 1 ? (
      <Carousel setApi={setApi}>
        <CarouselContent>
          {websiteLinks.map((link, index) => (
            <CarouselItem key={index}>
              <Microlink url={link} media="logo" />
            </CarouselItem>
          ))}
        </CarouselContent>
        {current !== 1 && <CarouselPrevious className="left-4" />}
        {current < websiteLinks.length && <CarouselNext className="right-4" />}
      </Carousel>
    ) : (
      <Microlink url={websiteLinks[0]} media="logo" />
    ))
  );
}

export default LinkPreviewer;

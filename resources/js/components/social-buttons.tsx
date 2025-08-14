import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

import { Button } from './ui/button';
import React from 'react';
import { route } from 'ziggy-js';
import { useLang } from '@hooks/useLang';

const oauth = (provider: string) =>
  (window.location.href = route('oauth', {
    provider,
    back: route().current(),
  }));

export default function SocialButtons() {
  const currentRoute = route().current();
  const { __ } = useLang();
  const continueWith = (provider: string) =>
    currentRoute === 'login'
      ? __('auth.social.login_with', { provider })
      : __('auth.social.register_with', { provider });

  return (
    <div className="grid gap-3">
      <Button
        variant="outline"
        className="w-full"
        onClick={() => oauth('google')}
      >
        <svg
          enableBackground="new 0 0 512 512"
          version="1.1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m113.47 309.41-17.822 66.532-65.139 1.378c-19.467-36.107-30.509-77.418-30.509-121.32 0-42.451 10.324-82.483 28.624-117.73h0.014l57.992 10.632 25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456 2e-3 18.792 3.406 36.797 9.651 53.408z"
            fill="#FBBB00"
          />
          <path
            d="m507.53 208.18c2.94 15.486 4.473 31.479 4.473 47.824 0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.92-90.134 146.19l-0.014-0.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89v-101.28h138.89 107.01z"
            fill="#518EF8"
          />
          <path
            d="m416.25 455.62 0.014 0.014c-43.871 35.263-99.601 56.362-160.27 56.362-97.491 0-182.25-54.491-225.49-134.68l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
            fill="#28B446"
          />
          <path
            d="m419.4 58.936-82.933 67.896c-23.335-14.586-50.919-23.012-80.471-23.012-66.729 0-123.43 42.957-143.96 102.72l-83.397-68.276h-0.014c42.606-82.145 128.44-138.27 227.38-138.27 62.115 0 119.07 22.126 163.4 58.936z"
            fill="#F14336"
          />
        </svg>
        {continueWith('Google')}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => oauth('facebook')}
      >
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          version="1.1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fillRule="nonzero">
            <path
              d="m512 256c0-141.38-114.62-256-256-256s-256 114.62-256 256c0 127.78 93.616 233.68 216 252.89v-178.89h-65v-74h65v-56.4c0-64.16 38.219-99.6 96.695-99.6 28.009 0 57.305 5 57.305 5v63h-32.281c-31.801 0-41.719 19.733-41.719 39.978v48.022h71l-11.35 74h-59.65v178.89c122.38-19.205 216-125.11 216-252.89z"
              fill="#1877f2"
            />
            <path
              d="m355.65 330 11.35-74h-71v-48.022c0-20.245 9.917-39.978 41.719-39.978h32.281v-63s-29.297-5-57.305-5c-58.476 0-96.695 35.44-96.695 99.6v56.4h-65v74h65v178.89c13.033 2.045 26.392 3.11 40 3.11s26.966-1.065 40-3.11v-178.89h59.65z"
              fill="#fff"
            />
          </g>
        </svg>
        {continueWith('Facebook')}
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => oauth('discord')}
      >
        <svg
          id="Discord-Logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 126.644 96"
        >
          <path
            fill="#5865f2"
            d="M81.15,0c-1.2376,2.1973-2.3489,4.4704-3.3591,6.794-9.5975-1.4396-19.3718-1.4396-28.9945,0-.985-2.3236-2.1216-4.5967-3.3591-6.794-9.0166,1.5407-17.8059,4.2431-26.1405,8.0568C2.779,32.5304-1.6914,56.3725.5312,79.8863c9.6732,7.1476,20.5083,12.603,32.0505,16.0884,2.6014-3.4854,4.8998-7.1981,6.8698-11.0623-3.738-1.3891-7.3497-3.1318-10.8098-5.1523.9092-.6567,1.7932-1.3386,2.6519-1.9953,20.281,9.547,43.7696,9.547,64.0758,0,.8587.7072,1.7427,1.3891,2.6519,1.9953-3.4601,2.0457-7.0718,3.7632-10.835,5.1776,1.97,3.8642,4.2683,7.5769,6.8698,11.0623,11.5419-3.4854,22.3769-8.9156,32.0509-16.0631,2.626-27.2771-4.496-50.9172-18.817-71.8548C98.9811,4.2684,90.1918,1.5659,81.1752.0505l-.0252-.0505ZM42.2802,65.4144c-6.2383,0-11.4159-5.6575-11.4159-12.6535s4.9755-12.6788,11.3907-12.6788,11.5169,5.708,11.4159,12.6788c-.101,6.9708-5.026,12.6535-11.3907,12.6535ZM84.3576,65.4144c-6.2637,0-11.3907-5.6575-11.3907-12.6535s4.9755-12.6788,11.3907-12.6788,11.4917,5.708,11.3906,12.6788c-.101,6.9708-5.026,12.6535-11.3906,12.6535Z"
          />
        </svg>

        {continueWith('Discord')}
      </Button>

      <div className="grid grid-cols-6 gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => oauth('github')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{continueWith('Github')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => oauth('reddit')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                width="256px"
                height="256px"
              >
                <g
                  id="object-2"
                  transform="matrix(1, 0, 0, 1, 1.4210854715202004e-14, 0)"
                >
                  <path
                    fill="#FF4500"
                    d="M128,0L128,0C57.3,0,0,57.3,0,128l0,0c0,35.4,14.3,67.4,37.5,90.5l-24.4,24.4c-4.8,4.8-1.4,13.1,5.4,13.1H128 l0,0c70.7,0,128-57.3,128-128l0,0C256,57.3,198.7,0,128,0z"
                    id="object-0"
                  />
                  <g id="object-1">
                    <radialGradient
                      id="SVGID_1_"
                      cx="981.0251"
                      cy="1.811"
                      r="127.45"
                      gradientTransform="matrix(0.47 0 0 -0.41 -260.07 108.3)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FEFFFF" />
                      <stop offset="0.4" stopColor="#FEFFFF" />
                      <stop offset="0.51" stopColor="#F9FCFC" />
                      <stop offset="0.62" stopColor="#EDF3F5" />
                      <stop offset="0.7" stopColor="#DEE9EC" />
                      <stop offset="0.72" stopColor="#D8E4E8" />
                      <stop offset="0.76" stopColor="#CCD8DF" />
                      <stop offset="0.8" stopColor="#C8D5DD" />
                      <stop offset="0.83" stopColor="#CCD6DE" />
                      <stop offset="0.85" stopColor="#D8DBE2" />
                      <stop offset="0.88" stopColor="#EDE3E9" />
                      <stop offset="0.9" stopColor="#FFEBEF" />
                    </radialGradient>
                    <circle
                      fill="url(#SVGID_1_)"
                      cx="200.6"
                      cy="123.7"
                      r="29.9"
                    />
                    <radialGradient
                      id="SVGID_00000036246770641878814990000005919777119678409602_"
                      cx="672.2592"
                      cy="1.811"
                      r="127.45"
                      gradientTransform="matrix(0.47 0 0 -0.41 -260.07 108.3)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FEFFFF" />
                      <stop offset="0.4" stopColor="#FEFFFF" />
                      <stop offset="0.51" stopColor="#F9FCFC" />
                      <stop offset="0.62" stopColor="#EDF3F5" />
                      <stop offset="0.7" stopColor="#DEE9EC" />
                      <stop offset="0.72" stopColor="#D8E4E8" />
                      <stop offset="0.76" stopColor="#CCD8DF" />
                      <stop offset="0.8" stopColor="#C8D5DD" />
                      <stop offset="0.83" stopColor="#CCD6DE" />
                      <stop offset="0.85" stopColor="#D8DBE2" />
                      <stop offset="0.88" stopColor="#EDE3E9" />
                      <stop offset="0.9" stopColor="#FFEBEF" />
                    </radialGradient>
                    <circle
                      fill="url(#SVGID_00000036246770641878814990000005919777119678409602_)"
                      cx="55.4"
                      cy="123.7"
                      r="29.9"
                    />
                    <radialGradient
                      id="SVGID_00000018938084004212545110000003812637463316940965_"
                      cx="830.6751"
                      cy="-224.6845"
                      r="384.44"
                      gradientTransform="matrix(0.47 0 0 -0.33 -260.07 25.03)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FEFFFF" />
                      <stop offset="0.4" stopColor="#FEFFFF" />
                      <stop offset="0.51" stopColor="#F9FCFC" />
                      <stop offset="0.62" stopColor="#EDF3F5" />
                      <stop offset="0.7" stopColor="#DEE9EC" />
                      <stop offset="0.72" stopColor="#D8E4E8" />
                      <stop offset="0.76" stopColor="#CCD8DF" />
                      <stop offset="0.8" stopColor="#C8D5DD" />
                      <stop offset="0.83" stopColor="#CCD6DE" />
                      <stop offset="0.85" stopColor="#D8DBE2" />
                      <stop offset="0.88" stopColor="#EDE3E9" />
                      <stop offset="0.9" stopColor="#FFEBEF" />
                    </radialGradient>
                    <ellipse
                      fill="url(#SVGID_00000018938084004212545110000003812637463316940965_)"
                      cx="128.1"
                      cy="149.3"
                      rx="85.3"
                      ry="64"
                    />
                    <path
                      fill="#842123"
                      d="M102.8,143.1c-0.5,10.8-7.7,14.8-16.1,14.8s-14.8-5.6-14.3-16.4s7.7-18,16.1-18S103.3,132.3,102.8,143.1z"
                    />
                    <path
                      fill="#842123"
                      d="M183.6,141.5c0.5,10.8-5.9,16.4-14.3,16.4s-15.6-3.9-16.1-14.8c-0.5-10.8,5.9-19.6,14.3-19.6 S183.1,130.6,183.6,141.5L183.6,141.5z"
                    />
                    <radialGradient
                      id="SVGID_00000100358442326342623590000001008359023910400391_"
                      cx="-2957.2551"
                      cy="173.4222"
                      r="32.12"
                      gradientTransform="matrix(-0.47 0 0 0.69 -1224.63 31.31)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FF6600" />
                      <stop offset="0.5" stopColor="#FF4500" />
                      <stop offset="0.7" stopColor="#FC4301" />
                      <stop offset="0.82" stopColor="#F43F07" />
                      <stop offset="0.92" stopColor="#E53812" />
                      <stop offset="1" stopColor="#D4301F" />
                    </radialGradient>
                    <path
                      fill="url(#SVGID_00000100358442326342623590000001008359023910400391_)"
                      d="M153.3,144.1c0.5,10.1,7.2,13.8,15,13.8 s13.8-5.5,13.4-15.7c-0.5-10.1-7.2-16.8-15-16.8S152.8,133.9,153.3,144.1z"
                    />
                    <radialGradient
                      id="SVGID_00000101795553196247918750000016558665307898727865_"
                      cx="745.2351"
                      cy="173.4222"
                      r="32.12"
                      gradientTransform="matrix(0.47 0 0 0.69 -260.07 31.31)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FF6600" />
                      <stop offset="0.5" stopColor="#FF4500" />
                      <stop offset="0.7" stopColor="#FC4301" />
                      <stop offset="0.82" stopColor="#F43F07" />
                      <stop offset="0.92" stopColor="#E53812" />
                      <stop offset="1" stopColor="#D4301F" />
                    </radialGradient>
                    <path
                      fill="url(#SVGID_00000101795553196247918750000016558665307898727865_)"
                      d="M102.8,144.1c-0.5,10.1-7.2,13.8-15,13.8 s-13.8-5.5-13.3-15.7c0.5-10.1,7.2-16.8,15-16.8S103.3,133.9,102.8,144.1z"
                    />
                    <path
                      fill="#BBCFDA"
                      d="M128.1,165.1c-10.6,0-20.7,0.5-30.1,1.4c-1.6,0.2-2.6,1.8-2,3.2c5.2,12.3,17.6,21,32.1,21s26.8-8.6,32.1-21 c0.6-1.5-0.4-3.1-2-3.2C148.8,165.6,138.7,165.1,128.1,165.1z"
                    />
                    <path
                      fill="#FFFFFF"
                      d="M128.1,167.5c-10.6,0-20.7,0.5-30,1.5c-1.6,0.2-2.6,1.8-2,3.3c5.2,12.5,17.6,21.3,32,21.3s26.8-8.8,32-21.3 c0.6-1.5-0.4-3.1-2-3.3C148.7,168,138.6,167.5,128.1,167.5L128.1,167.5z"
                    />
                    <radialGradient
                      id="SVGID_00000129915728043071345700000001618660102739666578_"
                      cx="826.4651"
                      cy="-508.4764"
                      r="113.26"
                      gradientTransform="matrix(0.47 0 0 -0.31 -260.07 37.28)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#172E35" />
                      <stop offset="0.29" stopColor="#0E1C21" />
                      <stop offset="0.73" stopColor="#030708" />
                      <stop offset="1" stopColor="#000000" />
                    </radialGradient>
                    <path
                      fill="url(#SVGID_00000129915728043071345700000001618660102739666578_)"
                      d="M128.1,166.2c-10.4,0-20.3,0.5-29.5,1.4 c-1.6,0.2-2.6,1.8-2,3.2c5.2,12.3,17.3,21,31.5,21s26.3-8.6,31.5-21c0.6-1.5-0.4-3.1-2-3.2C148.4,166.8,138.5,166.2,128.1,166.2z"
                    />
                    <radialGradient
                      id="SVGID_00000132773094689987568360000004811110407827195799_"
                      cx="926.3451"
                      cy="277.9019"
                      r="99.42"
                      gradientTransform="matrix(0.47 0 0 -0.47 -260.07 164.72)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FEFFFF" />
                      <stop offset="0.4" stopColor="#FEFFFF" />
                      <stop offset="0.51" stopColor="#F9FCFC" />
                      <stop offset="0.62" stopColor="#EDF3F5" />
                      <stop offset="0.7" stopColor="#DEE9EC" />
                      <stop offset="0.72" stopColor="#D8E4E8" />
                      <stop offset="0.76" stopColor="#CCD8DF" />
                      <stop offset="0.8" stopColor="#C8D5DD" />
                      <stop offset="0.83" stopColor="#CCD6DE" />
                      <stop offset="0.85" stopColor="#D8DBE2" />
                      <stop offset="0.88" stopColor="#EDE3E9" />
                      <stop offset="0.9" stopColor="#FFEBEF" />
                    </radialGradient>
                    <circle
                      fill="url(#SVGID_00000132773094689987568360000004811110407827195799_)"
                      cx="174.8"
                      cy="55.5"
                      r="21.2"
                    />
                    <radialGradient
                      id="SVGID_00000093173154653334829310000007940785063173693333_"
                      cx="884.9151"
                      cy="177.5619"
                      r="81.49"
                      gradientTransform="matrix(0.47 0 0 -0.47 -260.07 168.5)"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0.48" stopColor="#7A9299" />
                      <stop offset="0.67" stopColor="#172E35" />
                      <stop offset="0.75" stopColor="#000000" />
                      <stop offset="0.82" stopColor="#172E35" />
                    </radialGradient>
                    <path
                      fill="url(#SVGID_00000093173154653334829310000007940785063173693333_)"
                      d="M127.8,88c-2.5,0-4.6-1.1-4.6-2.7 c0-19,15.4-34.4,34.4-34.4c2.5,0,4.6,2.1,4.6,4.6s-2.1,4.6-4.6,4.6c-13.9,0-25.2,11.3-25.2,25.2C132.4,87,130.3,88,127.8,88z"
                    />
                    <path
                      fill="#FF6101"
                      d="M97.3,149.1c0,3.9-4.2,5.7-9.3,5.7s-9.3-1.8-9.3-5.7s4.2-7.1,9.3-7.1S97.3,145.1,97.3,149.1z"
                    />
                    <path
                      fill="#FF6101"
                      d="M177.5,149.1c0,3.9-4.2,5.7-9.3,5.7s-9.3-1.8-9.3-5.7s4.2-7.1,9.3-7.1S177.5,145.1,177.5,149.1z"
                    />
                    <ellipse
                      fill="#FFC49C"
                      cx="94.4"
                      cy="134.8"
                      rx="3.3"
                      ry="3.6"
                    />
                    <ellipse
                      fill="#FFC49C"
                      cx="173.3"
                      cy="134.8"
                      rx="3.3"
                      ry="3.6"
                    />
                  </g>
                </g>
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{continueWith('Reddit')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => oauth('dribbble')}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 31.9942C0 14.3331 14.3227 0 32 0C49.6786 0 64 14.346 64 32.0058C64 49.6669 49.6773 64 32 64H29.4043V63.8845C12.9519 62.5623 0 48.7824 0 31.9942ZM32.7959 58.798C47.2364 58.377 58.8087 46.5357 58.8087 32.0058C58.8087 17.2085 46.8075 5.19039 32 5.19039C17.1912 5.19039 5.19133 17.1983 5.19133 31.9942C5.19133 46.7895 17.2021 58.798 32 58.798H32.7959Z"
                  fill="#EC4989"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19.0444 8.5504C18.6885 8.4384 18.3196 8.3223 17.9352 8.19192L19.6032 3.27673C19.7564 3.32872 20.0323 3.41669 20.3544 3.5194C20.9331 3.70393 21.6609 3.936 22.0944 4.09232L22.1177 4.10071L22.1408 4.10954C22.2594 4.15489 22.3865 4.20297 22.5198 4.25338C23.1913 4.50734 24.0198 4.82067 24.7117 5.14427L24.7425 5.15864L24.8796 5.22718C25.2052 5.379 25.6942 5.61206 26.1015 5.80617C26.3301 5.91515 26.533 6.01185 26.6668 6.07501L26.7287 6.10425L26.789 6.13671C26.803 6.14427 26.8195 6.15307 26.8381 6.16302C26.9784 6.23816 27.2401 6.37818 27.4912 6.53161L27.5601 6.5737L27.5796 6.58735C27.6079 6.60383 27.6467 6.62585 27.6947 6.65254C27.7366 6.67588 27.7769 6.69807 27.8172 6.72024C27.8251 6.72459 27.833 6.72895 27.8409 6.73331C27.8631 6.74553 27.8884 6.75944 27.911 6.77208L27.9126 6.77297C27.9241 6.77938 27.9535 6.79575 27.9874 6.81555C28.018 6.83317 28.0652 6.86007 28.1242 6.89377C28.3047 6.99678 28.5964 7.16324 28.8672 7.32183C29.1462 7.4852 29.572 7.73684 29.8871 7.95772C30.2247 8.16503 30.5958 8.42209 30.8429 8.59324C30.8874 8.62408 30.9279 8.65213 30.9634 8.6766C31.1534 8.79228 31.3394 8.92346 31.4688 9.01621C31.654 9.14891 31.8556 9.29924 32.0394 9.43745C32.1244 9.5013 32.202 9.55988 32.2753 9.61525C32.3729 9.68889 32.4629 9.75684 32.5526 9.82395C32.6266 9.87937 32.6883 9.92504 32.7381 9.96122C32.7627 9.9791 32.7819 9.99283 32.7963 10.003C32.8086 10.0117 32.8144 10.0156 32.8147 10.0158L32.8823 10.0609L32.9475 10.1105C35.8123 12.2928 38.3635 14.8567 40.541 17.7143L40.5431 17.7169L40.5451 17.7196C42.9523 20.8955 44.8529 24.421 46.171 28.1728C50.0981 39.1418 48.9432 51.8142 42.7709 61.8175L38.3527 59.0924C43.6719 50.4716 44.696 39.4477 41.281 29.9155L41.2782 29.9077L41.2755 29.8999C40.1378 26.6593 38.4949 23.6089 36.4095 20.8569C34.5227 18.3816 32.3193 16.1648 29.8537 14.2791C29.7172 14.1845 29.566 14.0722 29.4424 13.9797C29.3488 13.9097 29.2388 13.8267 29.1303 13.7448C29.0574 13.6898 28.9853 13.6354 28.9193 13.5858C28.7411 13.4518 28.5792 13.3313 28.4451 13.2353C28.3256 13.1497 28.2759 13.1181 28.2762 13.1176C28.2763 13.1176 28.2765 13.1176 28.2769 13.1178L28.1996 13.0744L28.1095 13.0133C27.9769 12.9233 27.8588 12.8416 27.7506 12.7667C27.513 12.6023 27.3227 12.4706 27.1296 12.356L27.0032 12.2809L26.886 12.1921C26.8933 12.1976 26.8928 12.1973 26.8825 12.1904C26.8632 12.1776 26.8098 12.1421 26.7098 12.08C26.578 11.9983 26.4164 11.9018 26.2437 11.8006C25.9987 11.6572 25.7756 11.5299 25.5991 11.4292C25.5168 11.3822 25.4446 11.341 25.3851 11.3067L25.3797 11.3036C25.3706 11.2986 25.3572 11.2911 25.337 11.28C25.3308 11.2766 25.324 11.2729 25.3168 11.2689C25.2767 11.2469 25.2232 11.2174 25.1687 11.1871C25.1049 11.1516 25.0275 11.108 24.9522 11.0639C24.911 11.0398 24.8342 10.9946 24.7482 10.9388C24.6425 10.8758 24.5291 10.8149 24.3941 10.7424C24.3921 10.7413 24.3901 10.7402 24.3881 10.7391C24.2266 10.6627 24.0256 10.5669 23.8123 10.4651C23.4109 10.2737 22.9655 10.0614 22.6564 9.91764L22.6231 9.90216L22.4834 9.83233C21.9933 9.60511 21.4065 9.38267 20.7493 9.13349C20.6064 9.07932 20.4602 9.02389 20.3109 8.96687C19.9058 8.82147 19.4851 8.68909 19.0444 8.5504ZM25.3856 11.3069C25.3884 11.3085 25.3897 11.3092 25.3897 11.3092L25.3856 11.3069ZM25.3856 11.3069C25.3884 11.3085 25.3897 11.3092 25.3897 11.3092L25.3856 11.3069Z"
                  fill="#EC4989"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.9753 20.9031C37.8095 19.4886 45.039 15.0944 49.9836 8.8396L54.0564 12.0581C48.3423 19.2864 40.0009 24.3674 30.8972 26.011L30.8966 26.0111C26.3636 26.8284 21.7063 26.856 17.1601 26.0225C12.6263 25.2144 8.25142 23.5868 4.29461 21.2106L6.96759 16.7612C10.3772 18.8087 14.1561 20.2156 18.0773 20.9137L18.0841 20.9149L18.0909 20.9162C22 21.6336 26.0293 21.6145 29.9747 20.9032"
                  fill="#EC4989"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.1061 58.3111C20.5381 35.6959 43.5855 23.2062 62.4346 28.3436L61.0692 33.3513C45.0687 28.9903 25.0407 39.714 21.2006 59.3091L16.1061 58.3111Z"
                  fill="#EC4989"
                />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{continueWith('Dribbble')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => oauth('twitch')}
            >
              <svg
                enableBackground="new 0 0 512 512"
                version="1.1"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#7743D4">
                  <path d="m62.133 16.75-29.821 89.718v328.97h119.3v59.816h59.644l59.654-59.816h89.475l119.31-127.4v-291.29h-417.56zm387.72 269.15-83.502 89.72h-105.76l-64.246 46.863v-46.863h-104.39v-328.96h357.9v239.24z" />
                  <rect x="241.08" y="136.38" width="29.822" height="119.63" />
                  <rect x="330.56" y="136.38" width="29.822" height="119.63" />
                </g>
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{continueWith('Twitch')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => oauth('linkedin')}
            >
              <svg
                enableBackground="new 0 0 32 32"
                version="1.0"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#007BB5">
                  <rect y="9" width="7" height="23" />
                  <path d="M24.003,9C20,9,18.89,10.312,18,12V9h-7v23h7V19c0-2,0-4,3.5-4s3.5,2,3.5,4v13h7V19C32,13,31,9,24.003,9z" />
                  <circle cx="3.5" cy="3.5" r="3.5" />
                </g>
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{continueWith('Linkedin')}</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => oauth('spotify')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                <path
                  fill="#1ed760"
                  d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8Z"
                />
                <path d="M406.6 231.1c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3zm-31 76.2c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm-26.9 65.6c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4z" />
              </svg>
            </Button>
          </TooltipTrigger>
          <TooltipContent>{continueWith('Spotify')}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

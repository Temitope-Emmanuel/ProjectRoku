'use client';

import { demos, type Item } from '#/lib/demos';
import { NextLogo } from '#/ui/next-logo';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import { MenuAlt2Icon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Byline from './byline';
import { IP_ADDRESS, PORT } from '#/constant';
import { List } from './List';

export interface Directory {
  path: string;
  audioFiles: string[];
  directories: Directory[]
}

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const [err, setErr] = useState('')
  const [directory, setDirectory] = useState<Directory>({
    audioFiles: [],
    directories: [],
    path: ''
  });

  const getData = async () => {
    try {
      const response = await fetch(`http://${IP_ADDRESS}:${PORT}/list-downloads`);
      const data = await response.json();
      setDirectory(data)
    } catch (err: any) {
      console.log('there been an err', err)
      setErr(err.message)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-black lg:bottom-0 lg:z-auto lg:w-72 lg:border-b-0 lg:border-r lg:border-gray-800">
      <div className="flex h-14 items-center px-4 py-4 lg:h-auto">
        <Link
          href="/"
          className="group flex w-full items-center gap-x-2.5"
          onClick={close}
        >
          <div className="h-7 w-7 rounded-full border border-white/30 group-hover:border-white/50">
            <NextLogo />
          </div>

          <h3 className="font-semibold tracking-wide text-gray-400 group-hover:text-gray-50">
            Message Dissemination
          </h3>
        </Link>
      </div>
      <button
        type="button"
        className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-medium text-gray-100 group-hover:text-gray-400">
          Browse Messages
        </div>
        {isOpen ? (
          <XIcon className="block w-6 text-gray-400" />
        ) : (
          <MenuAlt2Icon className="block w-6 text-gray-400" />
        )}
      </button>

      <div
        className={clsx('overflow-y-auto lg:static lg:block', {
          'fixed inset-x-0 bottom-0 top-14 mt-px bg-black': isOpen,
          hidden: !isOpen,
        })}
      >
        <nav className="space-y-6 px-2 pb-24 pt-5">
          <List depth={0} items={[directory]} key={'idx'} close={close} />
        </nav>
        <Byline className="absolute hidden sm:block" />
      </div>
    </div>
  );
}

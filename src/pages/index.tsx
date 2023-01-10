import axios from 'axios';
import Image from 'next/image';
import * as React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';

if (typeof window !== 'undefined') {
  require('tw-elements');
}

export default function HomePage() {
  const [isPending, setIsPending] = useState(false);
  const [color, setColor] = useState('white');
  const [view, setView] = useState('front');
  const [image, setImage] = useState(`white_front`);
  const [prompt, setPrompt] = useState('');
  const [generated] = useState<string | undefined>('/images/lena.jpg');

  useEffect(() => {
    setImage(`${color}_${view}`);
  }, [color, view]);

  const handleGenerate = () => {
    if (!prompt) return alert('You need to type prompt');

    setIsPending(true);

    axios
      .get(`http://127.0.0.1:8000/generate_image?prompt=${prompt}`)
      .then((res) => {
        alert('res in console');
        // eslint-disable-next-line no-console
        console.log(res);
      })
      .catch((err) => {
        alert('Something went wrong');
        setIsPending(false);
        // eslint-disable-next-line no-console
        console.log(err);
      });
  };

  return (
    <div className='flex min-h-screen w-full items-center justify-center bg-gradient'>
      <div className='grid max-w-[90rem] grid-cols-3 gap-8 p-12'>
        <div className='height-full col-span-2 flex items-center justify-center'>
          <div className='relative'>
            <Image
              src={`/images/${image}.png`}
              alt=''
              width={1000}
              height={1000}
            />
            {generated ? (
              <Image
                src={generated}
                alt=''
                className='absolute top-1/2 left-1/2 w-[24rem] -translate-y-[18rem] -translate-x-1/2'
                width={512}
                height={512}
              />
            ) : null}
          </div>
        </div>
        <div className='flex h-auto w-full flex-col gap-4 rounded-2xl bg-white p-8 shadow-2xl'>
          <div>
            <label className='text-xs font-bold'>T-shirt color</label>
            <select
              value={color}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setColor(event.target.value)
              }
              className='form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
              aria-label='Default select example'
            >
              <option value='white'>White</option>
              <option value='black'>Black</option>
            </select>
          </div>
          <div>
            <label className='text-xs font-bold'>Place image on</label>
            <select
              value={view}
              onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                setView(event.target.value)
              }
              className='form-select m-0 block w-full appearance-none rounded border border-solid border-gray-300 bg-white bg-clip-padding bg-no-repeat px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
              aria-label='Default select example'
            >
              <option value='front'>Front</option>
              <option value='back'>Back</option>
            </select>
          </div>
          <div>
            <label className='text-xs font-bold'>Generate image</label>
            <input
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPrompt(event.target.value)
              }
              value={prompt}
              type='text'
              className='form-control m-0 block w-full rounded border border-solid border-gray-300 bg-white bg-clip-padding px-3 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none'
              placeholder='Type prompt'
            />
          </div>
          <div className='flex justify-center space-x-2'>
            <button
              onClick={handleGenerate}
              type='button'
              disabled={isPending}
              className={`inline-block w-full rounded bg-blue-600 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg ${
                isPending ? 'bg-gray-500' : ''
              }`}
            >
              Generate t-shirt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

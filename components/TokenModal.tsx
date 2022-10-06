import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { useTokenData } from '../hooks/useTokenData';
import { DateTime } from 'luxon';
import Link from 'next/link';
import { ExternalTokenIconListing } from './ExternalTokenIconListing';

interface TokenModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contract: string;
  tokenId: string;
}

export const TokenModal = ({
  isOpen,
  setIsOpen,
  contract,
  tokenId,
}: TokenModalProps) => {
  const [relativeTime, setRelativeTime] = useState<string | null>('');
  const [lastPrice, setLastPrice] = useState<number | null>(null);
  const { tokenData, error: tokenDataError } = useTokenData(contract, tokenId);
  const exitButtonRef = useRef(null);

  // check most recent trade, which could be a lastBuy, lastSell or none
  useEffect(() => {
    if (tokenData && tokenData.tokens[0]) {
      // if both lastBuy and lastSell exist, set the price of the more recent event
      if (
        tokenData.tokens[0].token.lastBuy.timestamp &&
        tokenData.tokens[0].token.lastSell.timestamp
      ) {
        if (
          tokenData.tokens[0].token.lastBuy.timestamp >
          tokenData.tokens[0].token.lastSell.timestamp
        ) {
          setLastPrice(tokenData.tokens[0].token.lastBuy.value);

          const relTime = DateTime.fromSeconds(
            tokenData.tokens[0].token.lastBuy.timestamp
          ).toRelative();

          setRelativeTime(relTime);
        } else {
          setLastPrice(tokenData.tokens[0].token.lastSell.value);

          const relTime = DateTime.fromSeconds(
            tokenData.tokens[0].token.lastSell.timestamp
          ).toRelative();

          setRelativeTime(relTime);
        }

        // only one or none exist, check lastBuy
      } else if (tokenData.tokens[0].token.lastBuy.timestamp) {
        setLastPrice(tokenData.tokens[0].token.lastBuy.value);

        const relTime = DateTime.fromSeconds(
          tokenData.tokens[0].token.lastBuy.timestamp
        ).toRelative();

        setRelativeTime(relTime);

        // only one or none exist, check lastSell
      } else if (tokenData.tokens[0].token.lastSell.timestamp) {
        setLastPrice(tokenData.tokens[0].token.lastSell.value);

        const relTime = DateTime.fromSeconds(
          tokenData.tokens[0].token.lastSell.timestamp
        ).toRelative();

        setRelativeTime(relTime);
      }
      // if none exist, leave lastPrice as null
    }
  }, [tokenData]);

  const closeModal = () => {
    setIsOpen(false);
  };

  // TODO: investigate bug where modal doesn't show sometimes
  // TODO: add loading picture while fetch in progress
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      initialFocus={exitButtonRef}
    >
      {/* backdrop */}
      <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

      {tokenData && tokenData.tokens[0] ? (
        <div className='flex items-center justify-center fixed inset-0 p-4'>
          <Dialog.Panel className='w-max h-max mx-8 px-12 py-6 rounded-lg bg-gray-700 text-white'>
            {/* collection name and token id */}
            <Dialog.Title className='flex justify-between py-2 text-xl font-semibold'>
              <div>
                {tokenData.tokens[0].token.collection.id &&
                tokenData.tokens[0].token.collection.name ? (
                  <Link
                    href={`/collection/${tokenData.tokens[0].token.collection.id}`}
                  >
                    <a className='text-sky-400'>
                      {tokenData.tokens[0].token.collection.name}
                    </a>
                  </Link>
                ) : null}{' '}
                | #{tokenData.tokens[0].token.tokenId}
              </div>
              <button
                ref={exitButtonRef}
                type='button'
                className='inline-flex justify-center px-2 py-1 text-sm font-medium text-gray-200 bg-gray-700 border border-transparent rounded hover:bg-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                onClick={closeModal}
              >
                X
              </button>
            </Dialog.Title>

            <Dialog.Description as='div' className='flex gap-4 mb-2'>
              {/* token image, ranks and external links */}
              <div className='flex flex-col'>
                <div>
                  {tokenData.tokens[0].token.image ? (
                    <Image
                      src={tokenData.tokens[0].token.image}
                      width={350}
                      height={350}
                      alt='NFT image'
                    />
                  ) : (
                    <Image
                      src='/images/eth.png'
                      width={100}
                      height={100}
                      alt='ETH logo'
                    />
                  )}
                </div>
                <div className='flex justify-between p-2 rounded-md bg-gray-600'>
                  <div className='font-medium'>
                    {tokenData.tokens[0].token.rarityRank ? (
                      <span className='text-sky-400'>
                        RANK: {tokenData.tokens[0].token.rarityRank}
                      </span>
                    ) : (
                      <span className='text-sky-400 align-middle mr-4'>
                        RANK: <span className='text-white'>???</span>
                      </span>
                    )}
                  </div>
                  <div className='flex gap-2 mt-1'>
                    <ExternalTokenIconListing
                      marketplace='opensea'
                      url={`https://opensea.io/assets/ethereum/${contract}/${tokenId}`}
                    />
                    <ExternalTokenIconListing
                      marketplace='looksrare'
                      url={`https://looksrare.org/collections/${contract}/${tokenId}`}
                    />
                    <ExternalTokenIconListing
                      marketplace='x2y2'
                      url={`https://x2y2.io/eth/${contract}/${tokenId}`}
                    />
                    <ExternalTokenIconListing
                      marketplace='etherscan'
                      url={`https://etherscan.io/token/${contract}?a=${tokenId}`}
                    />
                  </div>
                </div>
              </div>

              {/* traits */}
              <div className='flex flex-col h-min p-4 border-2 rounded-md border-gray-900 2xl:w-64'>
                {tokenData.tokens[0].token.attributes &&
                tokenData.tokens[0].token.attributes.length > 0 ? (
                  tokenData.tokens[0].token.attributes.map(
                    (attribute, index: number) => (
                      <div key={index}>
                        {index === 0 ? null : <hr className='my-1'></hr>}
                        <div className='text-sky-400 font-semibold'>
                          {attribute.key}
                        </div>
                        <div className='text-lg font-medium'>
                          {attribute.value}
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className='flex justify-center'>
                    Traits not available
                  </div>
                )}
              </div>

              {/* last sell info */}
              {lastPrice ? (
                <div className='text-xl'>
                  Last trade was at{' '}
                  <span className='font-bold'>Ξ{lastPrice}</span>,{' '}
                  {relativeTime}
                </div>
              ) : (
                <div className='text-xl'>There have been no recent trades.</div>
              )}
            </Dialog.Description>
          </Dialog.Panel>
        </div>
      ) : null}
    </Dialog>
  );
};

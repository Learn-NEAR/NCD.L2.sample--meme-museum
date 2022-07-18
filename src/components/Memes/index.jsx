import BN from 'bn.js';
import moment from 'moment';
import React, { useState } from 'react';
import { MemeCard } from './MemeCard';
import { donate, signIn, vote } from '../../services/near';
import { useContract } from '../../context/ContractProvider';

export const Memes = ({ accountId, memes }) => {
  const [selectedMeme, setSelectedMeme] = useState(null);
  const { contractId } = useContract();

  const match9gag = (link) => {
    if (link?.match('9gag')) {
      return `https://img-9gag-fun.9cache.com/photo/${link.split('https://9gag.com/gag/')[1]}_460s.jpg`;
    } else return link;
  };

  const dateFormat = (date) => moment(new BN(date) / 1000 / 1000).format('MMMM Do YYYY');

  const handleDonate = (id) => {
    if (accountId) {
      donate({ memeId: id, amount: '1' });
    } else {
      signIn();
    }
  };

  const handleVote = (id, number) => {
    if (accountId) {
      vote({ memeId: id, value: number });
    } else {
      signIn();
    }
  };

  return (
    <section className="relative">
      <img
        src={require('../../assets/img/image372.png')}
        alt=""
        className="hidden md:block absolute left-0 bottom-96"
      />
      <img src={require('../../assets/img/image278.png')} alt="" className="hidden md:block absolute right-0 top-96" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-24">
          {memes?.map((meme) => (
            <div key={meme.id} className="my-16">
              <a className="w-full h-70">
                <img
                  src={match9gag(meme.data)}
                  alt={meme.title}
                  className="w-full transform hover:scale-105 duration-200 card-shadow rounded-md"
                />
              </a>

              <div className="flex justify-between items-baseline mt-5">
                <p className="text-gradient-pink text-xl font-extrabold">{meme.title}</p>
                <p className="text-gray-400 font-semibold text-sm">{dateFormat(meme.created_at)}</p>
              </div>
              <p className="text-gray-900 text-xs mt-2">
                {meme.id}.{contractId}.testnet
              </p>

              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <p className="text-black text-sm font-bold">donations</p>
                  <p className="text-gradient-pink font-bold">{meme.total_donations / 1e24} Ⓝ</p>
                </div>
                <div className="text-center">
                  <p className="text-black text-sm font-bold">category</p>
                  <p className="text-gradient-pink font-bold">{meme.category}</p>
                </div>
                <div className="text-center">
                  <p className="text-black text-sm font-bold">score</p>
                  <p className="text-gradient-pink font-bold">{meme.vote_score}</p>
                </div>
              </div>

              <button
                onClick={() => handleDonate(meme.id)}
                className="inline-block mt-5 w-full py-3 bg-gradient-to-r border-2 border-white hover:border-blue-600 transform active:scale-95 from-blue-500 to-blue-600 hover:text-blue-600 hover:from-white hover:to-white hover:shadow-xl text-white text-center font-semibold rounded-md duration-200"
              >
                Donate 1 Ⓝ
              </button>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleVote(meme.id, 1)}
                  className="flex items-center justify-center mt-2 py-2 text-blue-600 text-xl font-bold w-full hover:bg-blue-600 hover:text-white rounded-md border-2 border-blue-600 transform active:scale-95 duration-200"
                >
                  <svg
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M2.19672 9.30004C2.19647 7.85037 2.7791 6.46149 3.81353 5.44586C4.84796 4.43024 6.2473 3.87319 7.69672 3.90004C9.41404 3.89092 11.0527 4.61921 12.1967 5.90004C13.3407 4.61921 14.9794 3.89092 16.6967 3.90004C18.1461 3.87319 19.5455 4.43024 20.5799 5.44586C21.6143 6.46149 22.197 7.85037 22.1967 9.30004C22.1967 14.656 15.8177 18.7 12.1967 21.9C8.58372 18.673 2.19672 14.66 2.19672 9.30004Z"
                      fill="currentColor"
                    />
                  </svg>
                  Vote
                </button>

                <button
                  onClick={() => handleVote(meme.id, -1)}
                  className="flex items-center justify-center mt-2 py-2 text-red-500 text-xl font-bold w-full hover:bg-red-500 hover:text-white rounded-md border-2 border-red-500 transform active:scale-95 duration-200"
                >
                  <svg
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <g clipPath="url(#clip0)">
                      <path
                        d="M12.4896 21.9452C11.8446 21.3732 11.1156 20.7782 10.3446 20.1452H10.3346C7.61959 17.9252 4.54259 15.4132 3.18359 12.4032C2.7371 11.4449 2.50049 10.4023 2.48957 9.34516C2.48659 7.89464 3.06836 6.50414 4.10339 5.48792C5.13843 4.4717 6.53937 3.91555 7.98959 3.94516C9.17021 3.94702 10.3254 4.28824 11.3176 4.92816C11.7536 5.21112 12.148 5.55341 12.4896 5.94516C12.8331 5.55495 13.2276 5.21286 13.6626 4.92816C14.6543 4.28811 15.8092 3.94687 16.9896 3.94516C18.4398 3.91555 19.8407 4.4717 20.8758 5.48792C21.9108 6.50414 22.4926 7.89464 22.4896 9.34516C22.4794 10.404 22.2428 11.4483 21.7956 12.4082C20.4366 15.4182 17.3606 17.9292 14.6456 20.1452L14.6356 20.1532C13.8636 20.7822 13.1356 21.3772 12.4906 21.9532L12.4896 21.9452ZM7.98959 5.94516C7.0581 5.9335 6.15966 6.29 5.48959 6.93716C4.84397 7.57132 4.48314 8.4402 4.4895 9.34516C4.50091 10.1157 4.67541 10.875 5.00159 11.5732C5.6431 12.8719 6.50869 14.0472 7.55859 15.0452C8.54959 16.0452 9.68958 17.0132 10.6756 17.8272C10.9486 18.0522 11.2266 18.2792 11.5046 18.5062L11.6796 18.6492C11.9466 18.8672 12.2226 19.0932 12.4896 19.3152L12.5026 19.3032L12.5086 19.2982H12.5146L12.5236 19.2912H12.5286H12.5336L12.5516 19.2762L12.5926 19.2432L12.5996 19.2372L12.6106 19.2292H12.6166L12.6256 19.2212L13.2896 18.6762L13.4636 18.5332C13.7446 18.3042 14.0226 18.0772 14.2956 17.8522C15.2816 17.0382 16.4226 16.0712 17.4136 15.0662C18.4636 14.0687 19.3292 12.8937 19.9706 11.5952C20.3027 10.891 20.4796 10.1237 20.4896 9.34516C20.4937 8.44299 20.1331 7.57745 19.4896 6.94516C18.8208 6.29507 17.9222 5.93564 16.9896 5.94516C15.8515 5.93548 14.7635 6.41252 13.9996 7.25616L12.4896 8.99616L10.9796 7.25616C10.2156 6.41252 9.12766 5.93548 7.98959 5.94516Z"
                        fill="currentColor"
                      />
                      <line
                        x1="1.46788"
                        y1="22.4232"
                        x2="23.6918"
                        y2="3.46749"
                        stroke="currentColor"
                        strokeWidth="1.96094"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0">
                        <rect x="0.489594" y="0.945312" width="24" height="24" rx="6" fill="currentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                  Vote
                </button>
              </div>

              <div className="mt-2 btn-border-pink w-full h-12 p-0.5">
                <button onClick={() => setSelectedMeme(meme)} className="btn-bg-pink">
                  <p className="btn-text-pink font-bold ">Comment / read comments</p>
                </button>
              </div>
            </div>
          ))}

          {selectedMeme ? (
            <MemeCard
              selectedMeme={selectedMeme}
              setSelectedMeme={setSelectedMeme}
              dateFormat={dateFormat}
              match9gag={match9gag}
              contractId={contractId}
              handleDonate={handleDonate}
              handleVote={handleVote}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { AddMemeForm } from './AddMemeForm';
import { ChangeContract } from './ChangeContract';
import { signIn, signOut } from '../../services/near';
import { useContract } from '../../context/ContractProvider';

export const Header = ({ accountId, setAccountId, memeIds }) => {
  const { contractId } = useContract();
  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;

  const [isOpenChangeContact, setIsOpenChangeContact] = useState(false);

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    setAccountId('');
  };

  return (
    <header id="header" className="relative header-bg">
      <div className="pointer-events-none">
        <img
          src={require('../../assets/img/image272.png').default}
          alt="explode"
          className="hidden md:block absolute top-0 right-0"
        />
        <img
          src={require('../../assets/img/image1342.png').default}
          alt="trophy"
          className="hidden md:block absolute -bottom-12 left-0"
        />
        <img
          src={require('../../assets/img/image1411.png').default}
          alt="trophy"
          className="hidden md:block absolute -bottom-12 right-0"
        />

        <img
          src={require('../../assets/img/Ellipse22.png').default}
          alt="lights"
          className="hidden md:block absolute left-0 top-16"
        />
        <img
          src={require('../../assets/img/Ellipse24.png').default}
          alt="lights"
          className="hidden md:block absolute left-44 xl:left-96 top-0"
        />
        <img
          src={require('../../assets/img/Ellipse21.png').default}
          alt="lights"
          className="hidden md:block absolute right-0 top-44"
        />
      </div>

      <div className="w-full h-3 bg-gradient-pink" />

      {isOpenChangeContact ? (
        <ChangeContract setIsOpenChangeContact={setIsOpenChangeContact} />
      ) : (
        <div className="absolute -top-1 w-full">
          <div className="relative flex flex-col items-center justify-center">
            <div className="pulsing absolute z-10 -top-px px-2 pb-2 bg-gradient-to-r from-pink-500 to-blue-400 rounded-b-full opacity-50"></div>
            <button
              onClick={() => setIsOpenChangeContact(true)}
              className="relative z-20 flex items-center justify-center w-20 h-10 rounded-b-full bg-gradient-to-r from-pink-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 bg-opacity-100 "
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="11" viewBox="0 0 20 11" fill="none">
                <path
                  d="M1.86961 0.408331L0.0996094 1.89166L9.99961 10.1333L19.8996 1.88333L18.1296 0.408331L9.99961 7.18333L1.86961 0.408331Z"
                  fill="white"
                />
              </svg>
            </button>
            {contractId === defaultContractId ? (
              <p className="text-white mt-2 font-semibold">Try frontend with your deployed contract ID</p>
            ) : (
              <>
                <p className="text-gradient-blue mt-2 font-semibold">Current ID</p>
                <p className="text-white font-semibold">{contractId}</p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="container mx-auto px-6">
        <nav className="mt-6 flex items-center justify-between py-3">
          <a
            href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum"
            target="_blank"
            className="flex"
            rel="noreferrer"
          >
            <img
              src={require('../../assets/img/near_logo_stack_1.png').default}
              alt=""
              className="border-r-2 border-white"
            />
            <div className="ml-2">
              <p className="text-gradient-blue text-2xl font-bold tracking-tight">Memes</p>
              <p className="-mt-2 font-josefin text-white text-2xl">museum</p>
            </div>
          </a>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white">
              <img src={require('../../assets/img/near_logo_stack2.png').default} alt="" />
            </div>

            {accountId ? (
              <>
                <p className="text-gradient-blue text-sm md:text-base">{accountId}</p>
                <button onClick={handleSignOut} className="text-white font-bold ml-3">
                  Log out
                </button>
              </>
            ) : (
              <button onClick={handleSignIn} className="ml-4 text-white text-sm md:text-xl font-bold">
                Log in with <span className="text-gradient-blue">NEAR Wallet</span>
              </button>
            )}
          </div>
        </nav>

        <div className="pb-24 xl:pb-40 2xl:pb-48">
          <div className="lg:mt-3 2xl:mt-14 text-center">
            <h1 className="flex justify-center items-baseline space-x-2 text-4xl lg:text-6xl 2xl:text-8xl text-white font-bold">
              <img
                src={require('../../assets/img/image1123.png').default}
                alt="pig"
                className="w-9 lg:w-20 h-9 lg:h-20 mr-3 -pb-4"
              />
              Meme Museum
              <span className="inline-block rounded-sm bg-gradient-blue w-2 md:w-5 h-2 md:h-5"></span>
            </h1>
            <p className="mt-2 2xl:mt-4 text-white text-base md:text-2xl tracking-wide">
              Share your favorite MEME. Comment, vote and <br className="hidden lg:block" /> engage with all the cool
              memes
            </p>
          </div>

          {accountId ? <AddMemeForm memeIds={memeIds} /> : null}
        </div>
      </div>
    </header>
  );
};

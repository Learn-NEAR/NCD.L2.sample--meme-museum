import React, { useState } from 'react';
import { useContract } from '../../../context/ContractProvider';

export const ChangeContract = ({ setIsOpenChangeContact }) => {
  const { contractId, setContractId, apiError, setApiError } = useContract();

  const defaultContractId = process.env.REACT_APP_CONTRACT_ID;

  const [inputContract, setInputContract] = useState('');

  const handleChange = (e) => {
    setInputContract(e.target.value);
    setApiError(false);
  };

  const setDefaultContractId = () => {
    localStorage.setItem('CONTRACT_ID', defaultContractId);
    setContractId(defaultContractId);
  };

  return (
    <div className="absolute z-20 w-full top-0 flex justify-center">
      <div className="relative w-374 bg-white shadow-xl px-4 pb-5 rounded-xl">
        <img src={require('../../../assets/img/image1412.png').default} alt="" className="absolute right-0 top-6" />

        <div className="relative flex flex-col items-center justify-center">
          <div className="pulsing absolute z-10 -top-px px-2 pb-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-b-full opacity-50"></div>
          <button
            onClick={() => setIsOpenChangeContact(false)}
            className="relative z-20 flex items-center justify-center w-20 h-10 rounded-b-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-400 hover:to-blue-500 bg-opacity-100 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="transform rotate-180 mb-2"
              width="20"
              height="11"
              viewBox="0 0 20 11"
              fill="none"
            >
              <path
                d="M1.86961 0.408331L0.0996094 1.89166L9.99961 10.1333L19.8996 1.88333L18.1296 0.408331L9.99961 7.18333L1.86961 0.408331Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto mt-4"
          width="151"
          height="40"
          viewBox="0 0 151 40"
          fill="none"
        >
          <g clipPath="url(#clip0_209_7034)">
            <path
              d="M75.588 8.30057V31.4804C75.588 31.657 75.4555 31.8336 75.2348 31.8336H72.8064C71.7026 31.8336 70.643 31.2596 70.0248 30.3324L59.0751 13.4222L59.4284 21.8553V31.5246C59.4284 31.7012 59.2959 31.8778 59.0751 31.8778H55.8962C55.7196 31.8778 55.543 31.7453 55.543 31.5246V8.30057C55.543 8.12397 55.6754 7.94736 55.8962 7.94736H58.2804C59.3842 7.94736 60.4438 8.52133 61.062 9.44853L72.0117 26.3146L71.6585 17.8816V8.30057C71.6585 8.12397 71.7909 7.94736 72.0117 7.94736H75.1906C75.4555 7.94736 75.588 8.07981 75.588 8.30057Z"
              fill="black"
            />
            <path
              d="M108.172 31.7895H104.817C104.596 31.7895 104.419 31.5687 104.508 31.3479L113.426 8.25642C113.515 8.07981 113.691 7.94736 113.868 7.94736H118.106C118.327 7.94736 118.504 8.07981 118.548 8.25642L127.511 31.3479C127.599 31.5687 127.423 31.7895 127.202 31.7895H123.846C123.714 31.7895 123.581 31.7012 123.537 31.5687L116.34 12.5833C116.252 12.3184 115.811 12.3184 115.722 12.5833L108.525 31.5687C108.437 31.7012 108.305 31.7895 108.172 31.7895Z"
              fill="black"
            />
            <path
              d="M150.913 31.2596L144.202 22.6941C147.999 21.9877 150.206 19.4269 150.206 15.4974C150.206 10.9938 147.292 7.94736 142.082 7.94736H132.722C132.457 7.94736 132.236 8.16812 132.236 8.43303C132.236 10.1991 133.649 11.612 135.415 11.612H141.729C144.864 11.612 146.365 13.2015 146.365 15.5415C146.365 17.8816 144.908 19.471 141.729 19.471H132.81C132.545 19.471 132.325 19.6918 132.325 19.9567V31.4362C132.325 31.6129 132.457 31.7895 132.678 31.7895H135.857C136.033 31.7895 136.21 31.657 136.21 31.4362V22.9149H139.875L145.703 30.5091C146.321 31.3479 147.292 31.7895 148.352 31.7895H150.78C150.957 31.7895 151.089 31.4804 150.913 31.2596Z"
              fill="black"
            />
            <path
              d="M98.1055 7.94736H83.3146C83.0497 7.94736 82.873 8.12397 82.873 8.38888C82.873 10.155 84.3301 11.612 86.0961 11.612H98.1055C98.2821 11.612 98.4587 11.4795 98.4587 11.2588V8.25642C98.4146 8.07981 98.2821 7.94736 98.1055 7.94736ZM98.1055 28.1248H87.0675C86.8909 28.1248 86.7143 27.9924 86.7143 27.7716V21.8111C86.7143 21.6345 86.8467 21.4579 87.0675 21.4579H97.2666C97.4432 21.4579 97.6198 21.3254 97.6198 21.1047V18.1023C97.6198 17.9257 97.4874 17.7491 97.2666 17.7491H83.3587C83.0938 17.7491 82.873 17.9699 82.873 18.2348V31.2596C82.873 31.5246 83.0938 31.7453 83.3587 31.7453H98.1055C98.2821 31.7453 98.4587 31.6129 98.4587 31.3921V28.3898C98.4146 28.2573 98.2821 28.1248 98.1055 28.1248Z"
              fill="black"
            />
            <path
              d="M31.8778 2.03099L23.5772 14.3494C23.0032 15.1883 24.107 16.2038 24.9018 15.4974L33.0699 8.38889C33.2906 8.21228 33.5997 8.34474 33.5997 8.6538V30.8623C33.5997 31.1713 33.2023 31.3038 33.0257 31.083L8.30058 1.50117C7.50585 0.529825 6.35789 0 5.07749 0H4.19444C1.89854 0 0 1.89854 0 4.2386V35.4982C0 37.8383 1.89854 39.7368 4.2386 39.7368C5.69561 39.7368 7.06433 38.9863 7.85906 37.7058L16.1596 25.3874C16.7336 24.5485 15.6298 23.533 14.8351 24.2395L6.66696 31.3038C6.4462 31.4804 6.13713 31.348 6.13713 31.0389V8.87456C6.13713 8.5655 6.5345 8.43304 6.71111 8.6538L31.4363 38.2357C32.231 39.207 33.4231 39.7368 34.6594 39.7368H35.5424C37.8825 39.7368 39.781 37.8383 39.781 35.4982V4.2386C39.7368 1.89854 37.8383 0 35.4982 0C34.0412 0 32.6725 0.750585 31.8778 2.03099Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_209_7034">
              <rect width="151" height="39.7368" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <p className="text-2xl font-bold text-center mt-4">Contract deploy</p>

        <p className="text-gray-500 text-center mt-3 text-sm">
          Please make sure that you put in input field correct contract id and your contract is deployed correctly. This
          is{' '}
          <a
            className="text-gradient-blue font-semibold"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/Learn-NEAR/NCD.L1.sample--meme-museum"
          >
            contract source code
          </a>{' '}
          with setup instructions. <br />
          <span className="text-black font-semibold">
            If your input is not valid, your will see error message with description of error
          </span>
        </p>

        <div className="flex flex-col items-center mt-3">
          <p className="mx-auto text-gradient-blue text-sm font-semibold">Current ID</p>
          <p className="text-center text-black text-sm font-semibold">{contractId}</p>
        </div>

        <form className="w-full mt-3">
          <input
            onChange={handleChange}
            value={inputContract}
            type="text"
            placeholder="Set your contract ID"
            className={`placeholder-gray-500 font-semibold w-full h-10 rounded-lg pl-4 text-sm border ${
              apiError ? 'border-red-500 text-red-500' : 'border-gray-400'
            } outline-none focus:border-blue-600`}
          />

          {apiError ? (
            <p className="text-sm text-red-500 top-2 right-4 font-semibold mt-px pt-px">Deployment error</p>
          ) : null}

          {inputContract && inputContract !== contractId ? (
            <button
              onClick={() => setContractId(inputContract)}
              className="w-full h-10 rounded-lg bg-gradient-to-r from-blue-400 to-blue-600 mt-5 text-white font-semibold text-base hover:to-blue-500 transform active:scale-95 duration-100"
            >
              Deploy
            </button>
          ) : null}
          <button
            onClick={setDefaultContractId}
            className="w-full h-10 rounded-lg bg-white border-2 border-red-500 mt-3 text-red-500 hover:text-white font-semibold text-base hover:bg-red-500 transform active:scale-95 duration-100"
          >
            Reset to default
          </button>
        </form>
      </div>
    </div>
  );
};

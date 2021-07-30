import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
// import SelectTokenModal from 'components/modals/select-token-modal/select-token-modal';
// import useAccountBalances from '@/composables/useAccountBalances';
import { sortBy, take } from 'lodash';
import { TOKENS } from 'constants/tokens';
import { ETHER } from 'constants/tokenlists';
import { getAddress } from '@ethersproject/address';
// import useWeb3 from '@/services/web3/useWeb3';
import { TokenMap } from 'types';
// import useTokens from '@/composables/useTokens';


const TokenSearchInput = ({ loading, type }) => {
  // emits: ['add', 'remove'],

  // COMPOSABLES
  // const { tokens } = useTokens();
  // const {
  //   isLoading: isLoadingBalances,
  //   balances,
  //   isIdle: isNotFetchingBalances
  // } = useAccountBalances();
  // const { account } = useWeb3();

  // sorted by biggest bag balance, limited to biggest 5
  const sortedBalances = useMemo(() => {
    return take(
      sortBy(Object.values(balances || {}), 'balance')
        .reverse()
        .filter(
          // (balance: any) =>
          (balance) =>
            !modelValue.includes(balance.address) &&
            balance.address !== ETHER.address
        ),
      6
    );
  }, [modelValue])

  const hasNoBalances = useMemo(() => {
    return !sortedBalances.length
  }, [sortedBalances])

  const whiteListedTokens = useMemo(() => {
      return Object.values(tokens as TokenMap)
        .filter(token => TOKENS.Popular.Symbols.includes(token.symbol))
        .filter(balance => !modelValue.includes(balance.address))
  }, [modelValue])

  // DATA
  const selectTokenModal = useRef(false);

  // METHODS
  // function addToken(token: string) {
  function addToken(token) {
    let _token = token;
    // special case for ETH where we want it to filter as WETH regardless
    // as ETH is the native asset
    if (getAddress(token) === ETHER.address) {
      _token = TOKENS.AddressMap.WETH;
    }
    // const newSelected = [...props.modelValue, _token];
    //!!! emit('add', _token);
  }

  function onClick() {
    if (!loading) selectTokenModal = true;
  }

  return (
    <div>
      <div className="flex items-center flex-wrap">
        <div className="flex items-center flex-wrap">
          <BalBtn color="gray" outline size="sm" onClick={onClick} className="mr-4">
            <BalIcon name="search" size="sm" class="mr-2" />
            filterByToken
            {/* { $t('filterByToken') } */}
          </BalBtn>
          {
            modelValue.map((token) => (
              <BalChip
                className="mr-2"
                key={token}
                color="white"
                iconSize="sm"
                closeable={true}
                {/* @closed="$emit('remove', token)" */}
              >
                <BalAsset address={token} size={20} className="flex-auto" />
                <span className="ml-2">{ tokens[token]?.symbol }</span>
              </BalChip>
            ))
          }
        </div>
        {
          account &&
          !isNotFetchingBalances &&
          !isLoadingBalances &&
          !hasNoBalances ? (
            <div className="text-gray-400 overflow-x-auto">
          <span className="mr-2">
            inYourWallet
            {/* { $t('inYourWallet') } */}
          </span>
              {
                sortedBalances.map((token) => (
                  <span
                    key={`wallet-${token.symbol}`}
                    className="mr-6 cursor-pointer hover:text-blue-700"
                    // @click="addToken(token.address)"
                  >
                { token?.symbol }
              </span>
                ))
              }
            </div>
          ) : (
            <div className="text-gray-400 flex flex-wrap py-3">
              <span className="mr-2">
                popularBases
                {/* { $t('popularBases') } */}
              </span>
              {
                whiteListedTokens.map((token) => (
                  <span
                    key={`popular-${token.symbol}`}
                    className="mr-3 md:mr-4 cursor-pointer hover:text-gray-700 dark:hover:text-white transition-colors"
                    onClick={addToken(token.address)}
                  >
                    { token?.symbol }
                  </span>
                ))
              }
            </div>
          )
        }
      </div>
      {/* <teleport to="#modal"> */}
      {/* <SelectTokenModal */}
      {/* if="selectTokenModal" */}
      {/*:excluded-tokens="modelValue"*/}
      {/*@close="selectTokenModal = false"*/}
      {/*@select="addToken"*/}
      {/* /> */}
      {/* </teleport> */}
    </div>
  )
}

TokenSearchInput.propTypes = {
  modelValue: PropTypes.arrayOf(PropTypes.string),
  // modelValue: Array as PropType<string[]>,
  loading: PropTypes.bool,
};

TokenSearchInput.defaultProps = {
  modelValue: [],
  // modelValue: () => [],
  loading: true,
};

export default TokenSearchInput;

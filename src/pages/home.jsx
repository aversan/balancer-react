import React, { useState, useMemo } from 'react';
import { getAddress } from '@ethersproject/address';
import { EXTERNAL_LINKS } from '@/constants/links';
// import TokenSearchInput from 'components/inputs/token-search-input';
import PoolsTable from '@/components/tables/pools-table/pools-table';
import usePools from '@/composables/pools/usePools';
import useWeb3 from '@/services/web3/useWeb3';
import usePoolFilters from '../composables/pools/usePoolFilters';

const HomePage = () => {
  const [isWalletReady, setIsWalletReady] = useState(false); // remove
  const [isLoadingUserPools, setIsLoadingUserPools] = useState(false); // remove
  const [isV1Supported, setIsV1Supported] = useState(false); // remove

  // COMPOSABLES
  // const { isWalletReady, isV1Supported } = useWeb3();
  // const {
  //   selectedTokens,
  //   addSelectedToken,
  //   removeSelectedToken
  // } = usePoolFilters();

  // const {
  //   pools,
  //   userPools,
  //   isLoadingPools,
  //   isLoadingUserPools,
  //   loadMorePools,
  //   poolsHasNextPage,
  //   poolsIsFetchingNextPage
  // } = usePools(selectedTokens);

  // COMPUTED
  const filteredPools = useMemo(() => {
    return selectedTokens.value.length <= 0 ? pools?.value : pools.value?.filter(pool => {
      const poolTokenList = pool.tokensList.map(getAddress);

      return selectedTokens.value.every((selectedToken: string) =>
        poolTokenList.includes(selectedToken)
      );
    })
  }, [selectedTokens, pools])

  const hideV1Links = useMemo(() => {
    return !isV1Supported
  }, [isV1Supported])

  return (
    <div className="lg:container lg:mx-auto pt-10 md:pt-12">
      {
        isWalletReady && (
          <>
            <div className="px-4 lg:px-0">
              <h3 className="mb-4">
                myV2Investments
                {/* {{ $t('myV2Investments') }} */}
              </h3>
            </div>
            <PoolsTable
              isLoading={isLoadingUserPools}
              data={userPools}
              noPoolsLabel={'noInvestments'}
              // noPoolsLabel={$t('noInvestments')}
              showPoolShares
              className="mb-8"
            />
            {
              !hideV1Links && (
                <div className="px-4 lg:px-0">
                  <div className="text-black-600">
                    seeV1BalancerInvestments
                    {/* { $t('seeV1BalancerInvestments') } */}
                  </div>
                  <BalLink href={EXTERNAL_LINKS.Balancer.PoolsV1Dashboard} external>
                    goToBalancerV1Site
                    {/* { $t('goToBalancerV1Site') } */}
                  </BalLink>
                </div>
              )
            }
            <div className="mb-16" />
          </>
        )
      }
      <div className="px-4 lg:px-0">
        <h3 className="mb-3">
          investmentPools
          {/* { $t('investmentPools') } */}
        </h3>
        {/*<TokenSearchInput*/}
        {/*  v-model="selectedTokens"*/}
        {/*  loading={isLoadingPools}*/}
        {/*  onAdd={addSelectedToken}*/}
        {/*  onRemove={removeSelectedToken}*/}
        {/*/>*/}
      </div>

      <PoolsTable
        isLoading={isLoadingPools}
        data={filteredPools}
        noPoolsLabel={'noPoolsFound'}
        // noPoolsLabel={$t('noPoolsFound')}
        isPaginated={poolsHasNextPage}
        isLoadingMore={poolsIsFetchingNextPage}
        onLoadMore={loadMorePools}
        className="mb-8"
      />
      {
        !hideV1Links && (
          <div className="px-4 lg:px-0">
            <div className="text-black-600">
              tableShowsBalancerV2Pools
              {/* { $t('tableShowsBalancerV2Pools') } */}
            </div>
            <BalLink href={EXTERNAL_LINKS.Balancer.PoolsV1Explore} external>
              exploreBalancerV1Pools
              {/* { $t('exploreBalancerV1Pools') } */}
            </BalLink>
          </div>
        )
      }
    </div>
  )
}

export default HomePage;

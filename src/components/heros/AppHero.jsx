import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BalBtn from 'components/_global/bal-btn/bal-btn';
import BalIcon from 'components/_global/bal-icon/bal-icon';
import BalLoadingBlock from 'components/_global/bal-loading-block/bal-loading-block';
import './app-hero.scss'
// import useNumbers from '@/composables/useNumbers';
// import usePools from '@/composables/pools/usePools';
import { EXTERNAL_LINKS } from 'constants/links';
// import useFathom from '@/composables/useFathom';
// import useWeb3 from '@/services/web3/useWeb3';

const AppHero = ({ className }) => {
  // const { fNum } = useNumbers();
  // const { isWalletReady, toggleWalletSelectModal } = useWeb3();
  // const { trackGoal, Goals } = useFathom();
  // const { totalInvestedAmount, isLoadingUserPools } = usePools();
  //
  // function onClickConnect() {
  //   toggleWalletSelectModal(true);
  //   trackGoal(Goals.ClickHeroConnectWallet);
  // }

  const [isWalletReady, setIsWalletReady] = useState(false);
  const [isLoadingUserPools, setIsLoadingUserPools] = useState(false);

  const componentClasses = classNames('app-hero bg-cover bg-center flex items-center justify-center text-center px-4', {
    'h-72': !isWalletReady,
    'h-40': isWalletReady,
  }, className)

  return (
    <div className={componentClasses}>
      <div className="w-full max-w-2xl mx-auto">
        {
          isWalletReady && (
            <>
              <h1 className="text-base font-medium text-white opacity-90 font-body mb-2">
                myInvestments
                {/* { $t('myInvestments') } */}
              </h1>
              {
                isLoadingUserPools && (
                  <BalLoadingBlock
                    className="h-10 w-40 mx-auto"
                    white
                  />
                )
              }
              {
                !isLoadingUserPools && (
                  <span className="text-3xl font-bold text-white">
                    totalInvestedAmount
                    {/* { fNum(totalInvestedAmount, 'usd', { forcePreset: true }) } */}
                  </span>
                )
              }
            </>
          )
        }
        {
          !isWalletReady && (
            <>
              <h1 className="text-white text-center text-4xl md:text-5xl pb-2">
                ammPlatform
                {/* { $t('ammPlatform') } */}
              </h1>
              <div className="flex justify-center mt-4">
                <BalBtn
                  color="white"
                  className="mr-3"
                  // onclick={onClickConnect}
                >
                  connectWallet
                  {/* { $t('connectWallet') } */}
                </BalBtn>
                <BalBtn
                  tag="a"
                  href={EXTERNAL_LINKS.Balancer.Home}
                  target="_blank"
                  rel="noreferrer"
                  color="white"
                  outline
                  // onclick={trackGoal(Goals.ClickHeroLearnMore)}
                >
                  learnMore
                  {/* { $t('learnMore') } */}
                  <BalIcon name="arrow-up-right" size="sm" className="ml-1" />
                </BalBtn>
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

AppHero.propTypes = {
  className: PropTypes.string,
};

AppHero.defaultProps = {
  className: '',
};

export default AppHero;

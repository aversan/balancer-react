import React from 'react';
import BalLoadingBlock from '@/components/_global/bal-loading-block/bal-loading-block'
import TradeCard from '@/components/cards/trade-card/trade-card';
import TradeCardGP from '@/components/cards/trade-card-gp/trade-card-gp';
import useTokenLists from '@/composables/useTokensStore';
import {TradeInterface} from '@/store/modules/app';
import usePoolFilters from '@/composables/pools/usePoolFilters';


const TradePage = () => {
//   // COMPOSABLES
//   const store = useStore();
//   const {isLoading: isLoadingTokens} = useTokenLists();
//   const {setSelectedTokens} = usePoolFilters();
//
//   // COMPUTED
//   const appLoading = computed(() => store.state.app.loading);
//   const tradeInterface = computed(() => store.state.app.tradeInterface);
//
//   onMounted(() => {
//   // selectedPoolTokens are only persisted between the Home/Pool pages
//   setSelectedTokens([]);
// });

  return (
    <div>
      <div className="trade-container">
        {
          (appLoading || isLoadingTokens) ? (
            <BalLoadingBlock className="h-96" />
          ) : (
            {
              (tradeInterface === TradeInterface.BALANCER) && (
                <TradeCard />
              )
              (tradeInterface === TradeInterface.GNOSIS) && (
                <TradeCardGP />
              )
            }
          )
        }
      </div>
    </div>
  )
}

export default TradePage;


// <script lang="ts">
//   import {defineComponent, computed, onMounted} from 'vue';
//   import {useStore} from 'vuex';
//
//
//   export default defineComponent({
//   setup() {
//   return {
//   appLoading,
//   tradeInterface,
//   isLoadingTokens,
//   TradeInterface
// };
// }
// });
// </script>

import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BalLoadingBlock from 'components/_global/bal-loading-block/bal-loading-block';

const BalTable = ({ className, square }) => {
  const componentClasses = classNames('max-w-full whitespace-nowrap overflow-hidden', {
    'rounded-lg': !square
  })

  const headerRef = createRef();
  const bodyRef = createRef();

  return (
  <div
    className={componentClasses}
  >
    <div className="overflow-hidden" ref={headerRef}>
      <table className="w-full table-fixed whitespace-normal">
        <colgroup>
          {
            filteredColumns.map(({ id, width }) => (
              <col
                key={id}
                style={{ width: `${width}px` }}
              />
            ))
          }
        </colgroup>
        <thead className="bg-white dark:bg-gray-900 z-20">
          {
            filteredColumns.map(({ id, align, name, Header, className }, columnIndex) => {
              const thClasses = classNames(
                'p-6 bg-white dark:bg-gray-850 headingShadow border-b dark:border-gray-900',
                {
                  'isSticky': isColumnStuck,
                  'cursor-pointer': sortKey,
                },
                getHorizontalStickyClass(columnIndex),
                className
              )

              return (
                <th
                  key={`header-${id}`}
                  className={thClasses}
                  ref={setHeaderRef(columnIndex)}
                  onClick={handleSort(id)}
                >
                  <div
                    className={classNames('flex', {
                      'justify-end': align === 'right',
                      'justify-start': align !== 'right',
                    })}
                  >
                    {
                      Header && (
                        <Header />
                      )
                    }
                    {
                      !Header && (
                        <h5 className="text-base text-gray-800 dark:text-gray-100">
                          { name }
                        </h5>
                      )
                    }
                    {
                      currentSortColumn === id && (
                        <BalIcon
                          name={ currentSortDirection === 'asc' ? "arrow-up" : "desc" }
                          size="sm"
                          className="ml-1 flex items-center"
                        />
                      )
                    }
                  </div>
                </th>
              )
            }
          }
        </thead>
      </table>
    </div>
    <div className="overflow-auto" ref={bodyRef}>
      {
        isLoading && (
          <BalLoadingBlock
            className={classNames(skeletonClass, min-w-full)}
            square
            style={{ width: `${placeholderBlockWidth}px` }}
          />
        )
      }
      {
        !isLoading && !tableData.length && (
          <div
            className="max-w-full bg-white dark:bg-gray-850 row-bg h-40 flex items-center justify-center text-gray-500"
          >
            { noResultsLabel || 'noResults' }
            {/* { noResultsLabel || $t('noResults') } */}
          </div>
        )
      }
      <table className="w-full table-fixed whitespace-normal">
        <colgroup>
          {
            filteredColumns.map(({ id, width }) => (
              <col
                key={id}
                style={{ width: `${width}px` }}
              />
            ))
          }
        </colgroup>
        <!-- begin measurement row -->
        <tr>
          {
            filteredColumns.map(({ id, align }, columnIndex) => {
              const tdClasses = classNames('bg-white dark:bg-gray-850 p-0 m-0 h-0', {
                className,
                getHorizontalStickyClass(columnIndex),
                'isSticky': isColumnStuck,
                'text-left': align !== 'right',
                'text-right': align === 'right',
              })

              return (
                <td
                  key={id}
                  className={tdClasses}
                />
              )
            }
          }
        </tr>
        <!-- end measurement row -->
        <tbody v-if="!isLoading && tableData.length">
          <tr
            v-for="(dataItem, index) in tableData"
            :key="`tableRow-${index}`"
            @click="handleRowClick(dataItem)"
            :className="[
              'bg-white z-10 row-bg group',
              { 'cursor-pointer': onRowClick }
            ]"
          >
            <td
              v-for="(column, columnIndex) in filteredColumns"
              :key="column.id"
              :className="[
                column.align === 'right' ? 'text-left' : 'text-right',
                getHorizontalStickyClass(columnIndex),
                isColumnStuck ? 'isSticky' : ''
              ]"
            >
              <router-link
                v-if="link"
                :to="{
                  name: link.to,
                  params: link.getParams(dataItem)
                }"
              >
                <slot
                  v-if="column.Cell"
                  v-bind="dataItem"
                  :name="column.Cell"
                ></slot>
                <div
                  v-else
                  :className="[
                    'px-6 py-4',
                    column.align === 'right' ? 'text-right' : 'text-left'
                  ]"
                >
                  {
                    typeof column.accessor === 'string'
                      ? dataItem[column.accessor]
                      : column.accessor(dataItem)
                  }
                </div>
              </router-link>
              <template v-else>
                <slot
                  v-if="column.Cell"
                  v-bind="dataItem"
                  :name="column.Cell"
                ></slot>
                <div
                  v-else
                  :className="[
                    'px-6 py-4',
                    column.align === 'right' ? 'text-right' : 'text-left'
                  ]"
                >
                  {
                    typeof column.accessor === 'string'
                      ? dataItem[column.accessor]
                      : column.accessor(dataItem)
                  }
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  {
    isPaginated && !isLoading && (
      <div
        className="bal-table-pagination-btn"
        onClick={!isLoadingMore && $emit('loadMore')}
  >
    { isLoadingMore && 'loading' }
    {/* { isLoadingMore && $t('loading') } */}
    { !isLoadingMore && (
      'loadMore'
      <BalIcon name="chevron-down" size="sm" className="ml-2"
    />
    ) }
  </div>
    )
  }
  )
}

BalTable.propTypes = {
  className: PropTypes.string,
};

BalTable.defaultProps = {
  className: '',
};

export default BalTable;


// <script lang="ts">
// import {
//   defineComponent,
//   onMounted,
//   PropType,
//   ref,
//   watch,
//   computed
// } from 'vue';
// import { sortBy, sumBy } from 'lodash';
//
// type Sticky = 'horizontal' | 'vertical' | 'both';
// type Data = any;
//
// type InitialState = {
//   sortDirection: 'asc' | 'desc' | null;
//   sortColumn: string | null;
// };
//
// export type ColumnDefinition<T = Data> = {
//   // Column Header Label
//   name: string;
//   // Unique ID
//   id: string;
//   // Key or function to access data from the row
//   accessor: string | ((row: T) => string);
//   // Slot ID for custom rendering the cell
//   Cell?: string;
//   // Slot ID for custom rendering a header
//   Header?: string;
//   // Is the column sortable
//   isSortable?: boolean;
//   // Extra classes to supply to the column. E.g. min width
//   className?: string;
//   // Left or right aligned content. E.g. Numbers should be right aligned
//   align?: 'left' | 'right';
//   // Should the column width grow to fit available space?
//   noGrow?: boolean;
//   // Set to true to hide the column
//   hidden?: boolean;
//   // Accessor for sorting purposes
//   sortKey?: string | ((row: T) => unknown);
//
//   width?: number;
// };
//
// export default defineComponent({
//   name: 'BalTable',
//
//   emits: ['loadMore'],
//
//   props: {
//     columns: {
//       type: Object as PropType<ColumnDefinition[]>,
//       required: true
//     },
//     data: {
//       type: Object as PropType<Data[]>
//     },
//     isLoading: {
//       type: Boolean,
//       default: () => false
//     },
//     isLoadingMore: {
//       type: Boolean,
//       default: false
//     },
//     skeletonClass: {
//       type: String
//     },
//     onRowClick: {
//       type: Function as PropType<(data: Data) => void>
//     },
//     sticky: {
//       type: String as PropType<Sticky>
//     },
//     square: {
//       type: Boolean,
//       default: false
//     },
//     isPaginated: {
//       type: Boolean,
//       default: false
//     },
//     noResultsLabel: {
//       type: String
//     },
//     link: {
//       type: Object,
//       default: null
//     },
//     initialState: {
//       type: Object as PropType<InitialState>,
//       default: () => ({
//         sortColumn: null,
//         sortDirection: null
//       })
//     }
//   },
//   setup(props) {
//     const stickyHeaderRef = ref();
//     const tableRef = ref<HTMLElement>();
//     const isColumnStuck = ref(false);
//     const tableData = ref(props.data);
//     const currentSortDirection = ref<InitialState['sortDirection']>(
//       props.initialState.sortDirection
//     );
//     const currentSortColumn = ref<InitialState['sortColumn']>(
//       props.initialState.sortColumn
//     );
//     const headerRef = ref<HTMLElement>();
//     const bodyRef = ref<HTMLElement>();
//
//     // for loading and no results
//     const placeholderBlockWidth = computed(() => sumBy(props.columns, 'width'));
//
//     const setHeaderRef = (columnIndex: number) => (el: HTMLElement) => {
//       if (el && columnIndex === 0) {
//         stickyHeaderRef.value = el;
//       }
//     };
//
//     // Need a method for horizontal stickiness as we need to
//     // check whether the table item belongs in the first column
//     const getHorizontalStickyClass = (index: number) => {
//       if (index !== 0) return '';
//       if (props.sticky === 'horizontal' || props.sticky === 'both') {
//         return 'horizontalSticky';
//       }
//       return '';
//     };
//
//     const handleRowClick = (data: Data) => {
//       if (props.link?.to) return;
//       props.onRowClick && props.onRowClick(data);
//     };
//
//     const handleSort = (columnId: string | null, updateDirection = true) => {
//       const column = props.columns.find(column => column.id === columnId);
//       if (!column?.sortKey) return;
//       if (columnId !== currentSortColumn.value)
//         currentSortDirection.value = null;
//
//       currentSortColumn.value = columnId;
//
//       if (updateDirection) {
//         if (currentSortDirection.value === null) {
//           currentSortDirection.value = 'desc';
//         } else if (currentSortDirection.value === 'desc') {
//           currentSortDirection.value = 'asc';
//         } else {
//           currentSortDirection.value = null;
//         }
//       }
//
//       const sortedData = sortBy(
//         (props.data as any).value || props.data,
//         column.sortKey
//       );
//       if (currentSortDirection.value === 'asc') {
//         tableData.value = sortedData;
//         return;
//       } else if (currentSortDirection.value === 'desc') {
//         tableData.value = sortedData.reverse();
//         return;
//       }
//       tableData.value = props.data;
//     };
//
//     onMounted(() => {
//       if (bodyRef.value) {
//         bodyRef.value.onscroll = () => {
//           if (bodyRef.value) {
//             const offsetRatio =
//               bodyRef.value.offsetWidth /
//               stickyHeaderRef.value.offsetWidth /
//               10;
//             isColumnStuck.value = !!(
//               stickyHeaderRef.value.offsetLeft >
//               stickyHeaderRef.value.offsetWidth * offsetRatio
//             );
//           }
//         };
//         bodyRef.value.addEventListener('scroll', () => {
//           if (bodyRef.value && headerRef.value) {
//             headerRef.value.scrollLeft = bodyRef.value.scrollLeft;
//           }
//         });
//       }
//     });
//
//     const filteredColumns = computed(() =>
//       props.columns.filter(column => !column.hidden)
//     );
//
//     watch(
//       () => props.data,
//       newData => {
//         if (currentSortColumn.value && currentSortDirection.value !== null) {
//           handleSort(currentSortColumn.value, false);
//           return;
//         }
//         tableData.value = newData;
//       }
//     );
//
//     return {
//       //refs
//       tableRef,
//       headerRef,
//       bodyRef,
//
//       // methods
//       setHeaderRef,
//       getHorizontalStickyClass,
//       handleSort,
//       handleRowClick,
//
//       //data
//       isColumnStuck,
//       tableData,
//       currentSortColumn,
//       currentSortDirection,
//       placeholderBlockWidth,
//
//       // computed
//       filteredColumns
//     };
//   }
// });
// </script>
//
// <style>
// .horizontalSticky {
//   @apply z-10 bg-white dark:bg-gray-850 group-hover:bg-gray-50 dark:group-hover:bg-gray-800 opacity-95 xs:opacity-90;
//   position: sticky;
//   left: 0;
//   width: 100%;
//   backdrop-filter: blur(2px);
// }
//
// .horizontalSticky::after {
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   width: 30px;
//   transform: translateX(100%);
//   transition: box-shadow 0.3s;
//   content: '';
//   pointer-events: none;
// }
//
// .isSticky::after {
//   box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 15%);
// }
//
// .row-bg {
//   @apply bg-white dark:bg-gray-850 hover:bg-gray-50 dark:hover:bg-gray-800;
// }
//
// .bal-table-pagination-btn {
//   @apply flex items-center justify-center h-16 transition-all;
//   @apply text-gray-500 font-medium hover:text-gray-800 dark:hover:text-gray-400;
//   @apply border-t dark:border-gray-900 rounded-b-lg;
//   @apply hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer;
// }
// </style>

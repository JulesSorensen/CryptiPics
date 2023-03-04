import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import {
  useTable,
  useResizeColumns,
  useBlockLayout,
  useSortBy,
  useFilters,
  Column,
  Cell,
  ColumnInstance,
  Row,
  CellProps,
  UseFiltersColumnProps,
  Filters,
  IdType,
  FilterValue
} from 'react-table'
import Loader from '@components/Loader'
import usePrevious from '@hooks/usePrevious'
import useEffectNotOnFirstRender from '@hooks/useEffectNotOnFirstRender'
import './styles.pcss'
import Select from '@components/Fields/Select'
import Input from '@components/Fields/Input'
import DatePicker from '@components/Fields/DatePicker'
import usePagination from '@hooks/usePagination'
import Pagination from '../Pagination'
import { PaginationMeta } from 'types/nestjs.types'
import { CheckIcon } from '@heroicons/react/outline'
import { renderDateCell } from '@utils/tables'
import classNames from 'classnames'

interface ICustomFilters {
  [key: string]: any
}

interface ITableData {
  [key: string]: any
}

interface IFilterOption {
  label?: string
  value: any
}

export type FilterType = 'select' | 'selectMultiple' | 'date' | 'checkbox' | 'default'

export type ITableColumn<T extends object> = {
  type?: 'default' | 'date' | 'boolean' | 'datetime' | 'action'
  filtered?: boolean
  filterType?: FilterType
  filterOptions?: IFilterOption[]
  isSortable?: boolean
} & Column<T>

interface Filter<T> {
  id: IdType<T>
  value: FilterValue
}

export interface IFilter<T extends {}> extends Filter<T> {
  type: FilterType
}

export type IFilters<T extends {}> = IFilter<T>[]

interface ITableBaseProps<T extends object> {
  // Structure of the columns for react-table
  columns: Array<ITableColumn<T>>
  // Data to be displayed in the table
  data: ITableData[]
  // Triggers everytime a page of the table is rendered providing the selected page number
  loadData: (pageNumber: number, filters?: IFilter<T>[], sorting?: ISortingSettings) => void
  // Displays a spinner instead of table's data
  isLoading?: boolean
  // ClassName prop of the container
  className?: string
  enableFilters?: boolean
  // Custom Filters only purpose is to detect when an external filter change, therefore reloading the data
  // on page one with the new filters
  customFilters?: ICustomFilters
  renderRowFooter?: (row: Row<T>) => string | React.ReactNode
  infiniteScroll?: boolean
}

interface ITableNotPaginatedProps extends ITableBaseProps<any> {
  paginated?: false
  pagination?: never
}

export interface IPaginationParams {
  total: number
  limit: number
  skip: number
}

interface ITablePaginatedProps extends ITableBaseProps<any> {
  paginated: true
  pagination?: PaginationMeta
}

export type ITableFilterProps<D extends {}> = { column: UseFiltersColumnProps<D> & ColumnInstance<D> & ITableColumn<D> }

export interface ISortingSettings {
  id: string
  // Is Ascending
  asc?: boolean
}

export type ITableProps = ITableNotPaginatedProps | ITablePaginatedProps

const Table: React.FC<ITableProps> = ({
  columns,
  data = [],
  loadData,
  className = '',
  paginated = false,
  isLoading = false,
  enableFilters = true,
  customFilters,
  renderRowFooter,
  infiniteScroll,
  pagination
}) => {
  const [paginatedData, setPaginatedData] = useState<any[]>([])

  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollTableToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0
      })
    }
  }

  useEffect(() => {
    if (infiniteScroll) {
      if (!pagination || !data) {
        setPaginatedData([])
      } else if (pagination.currentPage === 1) {
        scrollTableToTop()
        setPaginatedData(data)
      } else {
        const currentData = paginatedData ? paginatedData : []

        setPaginatedData([...currentData, ...data])
      }
    }
  }, [data])

  const [sortingSettings, setSortingSettings] = useState<ISortingSettings | undefined>()

  const defaultColumn: Partial<ITableColumn<any>> = useMemo(
    () => ({
      type: 'default',
      filterType: 'default',
      width: 80,
      Cell: (cellProps: CellProps<any>) => {
        const column = cellProps.column as ColumnInstance<any> & ITableColumn<any>

        switch (column.type) {
          case 'boolean':
            return <div className="text-xl pl-8">{cellProps.value ? <CheckIcon className="w-5 h-5" /> : ''}</div>

          case 'date':
            return renderDateCell(false)(cellProps)

          case 'datetime':
            return renderDateCell(true)(cellProps)

          default:
            return cellProps.value
        }
      },
      filterPlaceHolder: 'Filtrer',
      Filter: ({ column }: any) => {
        const onChange = (newValue: any) => {
          column.setFilter(newValue)
        }

        const filterType = column.filterType

        if (filterType === 'select') {
          const filterOptions = column.filterOptions
          return <Select onChange={onChange} items={filterOptions} />
        } else if (filterType === 'date') {
          return <DatePicker onChange={onChange} value={column.filterValue} placeholder="Filtre date" />
        } else {
          return <Input onChange={onChange} placeholder={column.filterPlaceHolder} />
        }
      }
    }),
    []
  )

  const onLoadData = (pageNumber: number) => {
    const filters = addTypesToFilters(state.filters)

    loadData(pageNumber, filters, sortingSettings)
  }

  const handlePageChange = (pageNumber: number) => {
    onLoadData(pageNumber)
  }

  const { pageNumber, onPageChange, setPageNumber } = usePagination(handlePageChange)

  useEffect(() => {
    if (pagination) {
      setPageNumber(pagination.currentPage)
    }
  }, [pagination])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state }: any = useTable(
    {
      columns,
      data: paginated && infiniteScroll ? paginatedData : data,
      defaultColumn,
      manualFilters: true,
      autoResetFilters: false
    } as any,
    useResizeColumns,
    useBlockLayout,
    useFilters,
    useSortBy
  )

  const addTypesToFilters = (filters: Filters<any>): IFilter<any>[] => {
    return filters.map(filter => {
      const columnItem = columns.find(column => column.id === filter.id)

      const type = columnItem && columnItem.filterType ? columnItem.filterType : 'default'

      return {
        ...filter,
        type
      }
    })
  }

  // load the initial page on mount
  useEffect(() => {
    onLoadData(1)
  }, [])

  const prevFilters = usePrevious(state.filters)

  const onFiltersChange = () => {
    onLoadData(1)
    scrollTableToTop()
  }

  // Resets the page number to 1 when inter filters change
  useEffect(() => {
    // We don't trigger the call on the first render
    if (prevFilters) {
      onFiltersChange()
    }
  }, [state.filters])

  useEffectNotOnFirstRender(() => {
    onFiltersChange()
  }, [customFilters, sortingSettings])

  const onSortClick = (id: string) => {
    const currentId = sortingSettings ? sortingSettings.id : null

    if (currentId === id && sortingSettings && !sortingSettings.asc) {
      setSortingSettings(undefined)
    } else {
      setSortingSettings({
        id,
        asc: currentId === id ? false : true
      })
    }
  }

  const onScroll = () => {
    if (scrollRef && scrollRef.current && pagination) {
      const currentHeight = scrollRef.current.scrollTop
      const totalHeight = scrollRef.current.scrollHeight
      const clientHeight = scrollRef.current.clientHeight
      const remainingToScroll = totalHeight - currentHeight - clientHeight

      if (remainingToScroll < 30 && pagination.currentPage < pagination.totalPages && !isLoading) {
        const newPageNumber = pagination.currentPage + 1
        onLoadData(newPageNumber)
      }
    }
  }

  const hasActiveFilter = useMemo(() => {
    return (
      enableFilters &&
      headerGroups.find((x: any) =>
        x.headers.find((column: ColumnInstance<any> & ITableColumn<any>) => column.filtered)
      )
    )
  }, [headerGroups])

  return (
    <>
      <div
        {...getTableProps()}
        className={`table-auto ${className} max-w-full align-middle border-b border-gray-200 dark:border-gray-800 shadow rounded-b-lg hidden lg:block`}
      >
        <div className="w-full max-w-full min-w-full">
          {headerGroups.map((headerGroup: any) => (
            <div key={headerGroup.getHeaderGroupProps().key}>
              <div
                {...headerGroup.getHeaderGroupProps()}
                className="max-w-full min-w-full bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-gray-800 rounded-t-lg dark:text-gray"
              >
                {headerGroup.headers.map((column: ITableColumn<any> & ColumnInstance<any>, index: number) => {
                  const onColumnClick = () => {
                    if (column.isSortable) {
                      onSortClick(column.id)
                    }
                  }

                  const isSorted = sortingSettings && sortingSettings.id === column.id
                  const isAscending = Boolean(isSorted && sortingSettings && sortingSettings.asc)

                  return (
                    <div
                      {...column.getHeaderProps()}
                      className={`${
                        column.isSortable ? 'cursor-pointer' : ''
                      } flex-grow overflow-hidden flex justify-between items-center
                      px-5 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 dark:text-gray-200
                      uppercase`}
                      key={index}
                      onClick={onColumnClick}
                    >
                      <div className="text-xs font-semibold w-full h-full flex items-center">
                        {column.render('Header')}
                        {isSorted && <i className={`lnr lnr-arrow-${isAscending ? 'down' : 'up'} ml-3`}></i>}
                        <div
                          // @ts-ignore
                          {...column.getResizerProps()}
                          // @ts-ignore
                          className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              {enableFilters && hasActiveFilter && (
                <div
                  className="w-full max-w-full min-w-full text-xs bg-gray-100 dark:bg-slate-700"
                  {...headerGroup.getHeaderGroupProps()}
                  key={'filterRow'}
                >
                  {headerGroup.headers.map((column: ColumnInstance<any> & ITableColumn<any>, index: number) => {
                    return (
                      <div
                        className={`flex justify-center text-xs items-center flex-grow px-4 py-2`}
                        {...column.getHeaderProps()}
                        key={index}
                      >
                        {column.filtered ? column.render('Filter') : null}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
        <div
          {...getTableBodyProps()}
          style={{
            maxHeight: infiniteScroll ? '630px' : undefined,
            overflowY: infiniteScroll ? 'scroll' : undefined,
            paddingBottom: infiniteScroll ? '60px' : undefined
          }}
          onScroll={onScroll}
          ref={scrollRef}
          className={`bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
           dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-800`}
        >
          {(!isLoading || infiniteScroll) &&
            rows.map((row: Row, i: number) => {
              prepareRow(row)
              const isOdd = i % 2

              const rowProps = row.getRowProps()

              return (
                <Fragment key={i}>
                  <div
                    {...rowProps}
                    style={{ ...rowProps.style, width: undefined, minHeight: '60px' }}
                    className="w-full max-w-full"
                  >
                    {row.cells.map((cell: Cell, index: number) => {
                      return (
                        <div
                          {...cell.getCellProps()}
                          className={`flex-grow pl-6 py-3 text-xs ${
                            isOdd ? 'bg-gray-50 dark:bg-slate-700' : 'dark:bg-slate-600'
                          } overflow-hidden ${i === rows.length - 1 ? '' : ''}`}
                        >
                          <div className="flex items-center h-full dark:text-white">{cell.render('Cell')}</div>
                        </div>
                      )
                    })}
                  </div>
                  {renderRowFooter && renderRowFooter(row)}
                </Fragment>
              )
            })}
          {!rows.length && !isLoading && (
            <div className="text-center text-slate-500 dark:text-white p-8">Aucune donnée</div>
          )}
          {isLoading && (
            <div className="w-full h-full py-28">
              <Loader />
            </div>
          )}
        </div>
      </div>
      {/* Responsive Display */}
      <div className="lg:hidden w-full overflow-hidden">
        {isLoading && (
          <div className="w-full h-full py-28">
            <Loader />
          </div>
        )}
        {!isLoading &&
          rows.map((row: Row, i: number) => {
            return (
              <div className="mb-3" key={`row-mobile-${i}`}>
                {row.cells.map((cell, j) => {
                  const column = cell.column as ColumnInstance<any> & ITableColumn<any>
                  return (
                    <div
                      key={`cell-mobile-${i}-${j}`}
                      className={classNames(
                        'text-xs dark:text-white border-b bg-gray-100 dark:bg-slate-700 border-gray-200 dark:border-gray-800 flex p-5',
                        {
                          'justify-between': column.type !== 'action',
                          'justify-center': column.type === 'action'
                        }
                      )}
                    >
                      {column.type != 'action' && <div className="font-semibold">{cell.render('Header')}</div>}
                      <div>{cell.render('Cell')}</div>
                    </div>
                  )
                })}
              </div>
            )
          })}
      </div>
      {!infiniteScroll && paginated && pagination && (
        <Pagination
          activePage={pageNumber}
          itemsCountPerPage={pagination.itemsPerPage}
          totalItemsCount={pagination.totalItems}
          onChange={onPageChange}
        />
      )}
    </>
  )
}

export default Table

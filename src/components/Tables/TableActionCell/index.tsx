import React from 'react'
import Button from '@components/Button'
import tailwindConfig from '../../../../tailwind.config'
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline'

type ActionType = 'edit' | 'view' | 'delete' | string

export interface TableRowAction {
  type?: ActionType
  onClick?: () => void
  icon?: JSX.Element
  color?: string
  textColor?: string
}

interface ITableActionCell {
  actions: TableRowAction[]
}

const TableActionCell: React.FC<ITableActionCell> = ({ actions }) => {
  const getDefaultSettings = (type: ActionType | undefined) => {
    switch (type) {
      case 'edit':
        return {
          icon: <PencilIcon className="w-5 h-5" />,
          color: tailwindConfig.theme.extend.colors.primary
        }

      case 'delete':
        return {
          icon: <TrashIcon className="w-5 h-5" />,
          color: '#1E2D3F'
        }

      case 'view':
      default:
        return {
          icon: <EyeIcon className="w-5 h-5" />,
          color: tailwindConfig.theme.extend.colors.secondary
        }
    }
  }

  return (
    <div className="flex w-full justify-center lg:w-auto lg:justify-start">
      {actions.map(({ type, onClick, icon, color, textColor }, index) => {
        let defaultSettings = getDefaultSettings(type)

        const isFirst = index === 0
        const isLast = index === actions.length - 1

        return (
          <Button
            onClick={onClick}
            className="hover:opacity-75"
            style={{
              padding: '8px 10px',
              backgroundColor: color ? color : defaultSettings.color,
              color: textColor ? textColor : 'white',
              borderTopLeftRadius: isFirst ? '0.25rem' : 0,
              borderBottomLeftRadius: isFirst ? '0.25rem' : 0,
              borderTopRightRadius: isLast ? '0.25rem' : 0,
              borderBottomRightRadius: isLast ? '0.25rem' : 0
            }}
            key={`action-${index}`}
          >
            {icon ? icon : defaultSettings.icon}
          </Button>
        )
      })}
    </div>
  )
}

export default TableActionCell

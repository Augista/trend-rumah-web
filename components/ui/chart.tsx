'use client'

import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '@/lib/utils'

// Theme mapping
const THEMES = { light: '', dark: '.dark' } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
    color?: string
    theme?: Record<keyof typeof THEMES, string>
  }
}

type ChartContextProps = { config: ChartConfig }

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<'div'> & {
  config: ChartConfig
  children: React.ReactNode
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          'flex aspect-video justify-center text-xs',
          '[&_.recharts-layer]:outline-hidden [&_.recharts-surface]:outline-hidden',
          '[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground',
          '[&_.recharts-cartesian-grid_line[stroke=\"#ccc\"]]:stroke-border/50',
          '[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border',
          '[&_.recharts-radial-bar-background-sector]:fill-muted',
          '[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted',
          '[&_.recharts-reference-line_[stroke=\"#ccc\"]]:stroke-border',
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, conf]) => conf.theme || conf.color,
  )

  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, conf]) => {
    const color = conf.theme?.[theme as keyof typeof THEMES] || conf.color
    return color ? `  --color-${key}: ${color};` : ''
  })
  .join('\n')}
}`,
          )
          .join('\n'),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: {
  active?: boolean
  payload?: any[]
  className?: string
  indicator?: 'line' | 'dot' | 'dashed'
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string
  labelFormatter?: (value: any, payload: any) => React.ReactNode
  labelClassName?: string
  formatter?: (
    value: any,
    name: string,
    item: any,
    index: number,
    full: any,
  ) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}) {
  const { config } = useChart()

  if (!active || !payload?.length) return null

  const [item] = payload
  const key = labelKey || item?.dataKey || item?.name || 'value'
  const itemConfig = getPayloadConfigFromPayload(config, item, key)
  const tooltipLabel =
    !hideLabel &&
    (labelFormatter
      ? labelFormatter(label, payload)
      : itemConfig?.label || label)

  return (
    <div
      className={cn(
        'grid min-w-[8rem] gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className,
      )}
    >
      {tooltipLabel && (
        <div className={cn('font-medium', labelClassName)}>{tooltipLabel}</div>
      )}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || 'value'
          const conf = getPayloadConfigFromPayload(config, item, key)
          const indicatorColor = color || item.payload?.fill || item.color
          return (
            <div
              key={index}
              className="flex w-full items-center gap-2 text-muted-foreground"
            >
              {!hideIndicator && (
                <div
                  className={cn(
                    'rounded-sm',
                    indicator === 'dot' && 'h-2.5 w-2.5',
                    indicator === 'line' && 'h-0.5 w-4',
                    indicator === 'dashed' &&
                      'w-4 border border-dashed border-current',
                  )}
                  style={{ backgroundColor: indicatorColor }}
                />
              )}
              <span>{conf?.label || item.name}</span>
              {item.value !== undefined && (
                <span className="ml-auto font-mono font-medium text-foreground tabular-nums">
                  {item.value.toLocaleString()}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const ChartLegend = RechartsPrimitive.Legend

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}: {
  className?: string
  hideIcon?: boolean
  payload?: any[]
  verticalAlign?: 'top' | 'bottom'
  nameKey?: string
}) {
  const { config } = useChart()

  if (!payload?.length) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className,
      )}
    >
      {payload.map((item) => {
        const key = nameKey || item.dataKey || 'value'
        const conf = getPayloadConfigFromPayload(config, item, key)
        return (
          <div
            key={item.value}
            className="flex items-center gap-1.5 text-muted-foreground"
          >
            {!hideIcon && (
              <div
                className="h-2 w-2 rounded-sm"
                style={{ backgroundColor: item.color }}
              />
            )}
            <span>{conf?.label || item.value}</span>
          </div>
        )
      })}
    </div>
  )
}

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string,
) {
  if (typeof payload !== 'object' || !payload) return undefined
  const payloadPayload = payload.payload ?? {}
  const labelKey =
    typeof payload[key] === 'string'
      ? payload[key]
      : typeof payloadPayload[key] === 'string'
      ? payloadPayload[key]
      : key
  return config[labelKey] || config[key]
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}

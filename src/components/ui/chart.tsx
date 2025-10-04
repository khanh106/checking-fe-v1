"use client";

import * as React from "react";
import {
  Label,
  Pie,
  PieChart as PieChartPrimitive,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  Legend,
} from "recharts";
import {
  Axis,
  Chart as ChartPrimitive,
  type ChartProps as ChartPrimitiveProps,
} from "recharts";

import { cn } from "@/lib/utils";
import {
  type ComponentProps,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
} from "react";

// =================================================================================================
// Hook Debounce
// =================================================================================================
function useDebounceCallback<A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number
) {
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: A) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

// =================================================================================================

// ... (phần còn lại của file giữ nguyên)
// NOTE: Vui lòng dán toàn bộ nội dung bên dưới vào file,
// bắt đầu từ dòng này trở đi, thay thế cho nội dung cũ tương ứng.

const ChartContainer = forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig;
    debounce?: number;
  }
>(({ id, className, children, config, debounce = 0, ...props }, ref) => {
  const chartId = `chart-${useId()}`;
  const [activeChart, setActiveChart] = React.useState<string | null>(null);

  const handleResize = useDebounceCallback(
    (payload: { chartId?: string | undefined }[]) => {
      // Logic xử lý resize ở đây
    },
    debounce
  );

  return (
    <ChartContext.Provider
      value={{
        chartId,
        config,
        activeChart: activeChart,
        setActiveChart: setActiveChart,
      }}
    >
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-radial-bar-sector]:stroke-border [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector[path]]:stroke-border [&_.recharts-sector[path]]:stroke-border",
          className
        )}
        {...props}
      >
        <ResponsiveContainer onResize={debounce > 0 ? handleResize : undefined}>
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
ChartContainer.displayName = "Chart";

// ... (Các phần còn lại của file giữ nguyên không đổi)
type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<string, string> }
  );
};

type ChartContextProps = {
  config: ChartConfig;
  chartId: string;
  activeChart: string | null;
  setActiveChart: (chartId: string | null) => void;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}
const ChartTooltip = Tooltip;

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Tooltip> &
    ComponentProps<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      indicator?: "line" | "dot" | "dashed";
      nameKey?: string;
      labelKey?: string;
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart();

    const tooltipLabel = useMemo(() => {
      if (hideLabel || !payload || payload.length === 0) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || item.dataKey || "value"}`;
      const itemConfig = config[key] || config[item.name];

      if (label) {
        return <div className={cn("font-medium", labelClassName)}>{label}</div>;
      }

      if (!itemConfig) {
        return null;
      }

      const value =
        !labelKey && typeof labelFormatter === "function"
          ? labelFormatter(item.name, payload)
          : itemConfig.label || item.name;

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      payload,
      hideLabel,
      labelFormatter,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload || payload.length === 0) {
      return null;
    }

    const nestLabel = payload.length === 1 && payload[0].name;

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!hideLabel && nestLabel ? null : tooltipLabel}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || "value"}`;
            const itemConfig = config[key];
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground"
                )}
              >
                {itemConfig?.icon ? (
                  <itemConfig.icon />
                ) : (
                  !hideIndicator && (
                    <div
                      className={cn(
                        "shrink-0 rounded-[2px] border-[1px] border-transparent",
                        {
                          "bg-transparent": indicator === "dot",
                          "border-dashed bg-transparent":
                            indicator === "dashed",
                        }
                      )}
                      style={{
                        borderColor: indicatorColor,
                      }}
                    >
                      <div
                        className={cn("h-1.5 w-1.5 shrink-0 rounded-[2px]", {
                          "bg-background": indicator === "dashed",
                        })}
                        style={{
                          backgroundColor: indicatorColor,
                        }}
                      />
                    </div>
                  )
                )}
                <div
                  className={cn(
                    "flex flex-1 justify-between leading-none",
                    item.name === "Rest" && "hidden"
                  )}
                >
                  <div className="grid gap-1.5">
                    <span className="text-muted-foreground">
                      {itemConfig?.label || item.name}
                    </span>
                  </div>
                  {formatter ? (
                    formatter(item.value, item.name, item, index, payload)
                  ) : (
                    <span className="font-medium text-foreground">
                      {`${item.value}`}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = Legend;

const ChartLegendContent = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> &
    Pick<ComponentProps<typeof Legend>, "payload" | "verticalAlign"> & {
      hideIcon?: boolean;
      nameKey?: string;
    }
>(({ className, hideIcon = false, payload, verticalAlign, nameKey }, ref) => {
  const { config, activeChart, setActiveChart } = useChart();

  if (!payload || !payload.length) {
    return null;
  }
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = config[key];

        return (
          <button
            key={item.value}
            className={cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground",
              item.value === activeChart
                ? "[&>svg]:text-foreground"
                : "text-muted-foreground"
            )}
            onClick={() => {
              setActiveChart(activeChart === item.value ? null : item.value);
            }}
          >
            {itemConfig?.icon && !hideIcon ? (
              <itemConfig.icon />
            ) : (
              <div
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            {itemConfig?.label}
          </button>
        );
      })}
    </div>
  );
});
ChartLegendContent.displayName = "ChartLegendContent";

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const css = React.useMemo(() => {
    const A = Object.entries(config)
      .map(([key, value]) => {
        const name = key.replace(/\s/g, "");
        const color =
          value.color ||
          (value.theme && value.theme.light) ||
          "hsl(var(--primary))";
        const colorDark =
          value.color ||
          (value.theme && value.theme.dark) ||
          "hsl(var(--primary))";

        return `
[data-chart=${id}] .${name} {
  --color-primary: ${color};
}
.dark [data-chart=${id}] .${name} {
  --color-primary: ${colorDark};
}
`;
      })
      .join("\n");

    return A;
  }, [config, id]);

  return <style>{css}</style>;
};

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};

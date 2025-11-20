"use client";

import clsx from "clsx";

export type ToggleOption<T extends string> = {
  value: T;
  label: string;
};

interface ToggleGroupProps<T extends string> {
  value: T;
  options: ToggleOption<T>[];
  onChange: (value: T) => void;
  className?: string;
  variant?: "pill";
  disabled?: boolean;
}

export function ToggleGroup<T extends string>({
  value,
  options,
  onChange,
  className,
  variant = "pill",
  disabled = false,
}: ToggleGroupProps<T>) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-1 text-sm",
        variant === "pill" &&
          "rounded-full border border-slate-600 bg-slate-900/80 p-1",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      aria-disabled={disabled}
      role="radiogroup"
    >
      {options.map((option) => {
        const isActive = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={disabled}
            onClick={() => !disabled && onChange(option.value)}
            className={clsx(
              "rounded-full px-3 py-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
              isActive
                ? "bg-blue-500/20 text-slate-50"
                : "text-slate-400 hover:text-slate-100"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

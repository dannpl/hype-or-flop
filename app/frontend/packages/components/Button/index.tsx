import type { StrictOmit } from 'ts-essentials';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import { IconLoading } from '../Icons/IconLoading';

type BaseProps = {
  /** @default "contained" */
  variant?: 'contained' | 'outlined';
  /** @default "default" */
  size?: 'x-small' | 'small' | 'default' | 'large';
  /** @default "primary" */
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'gray'
    | 'blue'
    | 'purple'
    | 'light-red'
    | 'red';
  children: ReactNode;
  className?: string;
  loading?: boolean;
};

type ButtonOnlyProps = BaseProps &
  StrictOmit<ComponentProps<'button'>, 'children'>;

export type ButtonProps = ButtonOnlyProps;

export function Button({
  children,
  variant = 'contained',
  size = 'default',
  color = 'primary',
  loading,
  className: buttonClassName,
  ...rest
}: ButtonProps) {
  const className = {
    size: {
      'x-small': 'text-[10.5px]/5 px-1.5',
      small: 'text-xs py-0.5 px-3',
      default: 'text-sm py-1 px-3',
      large: 'text-base py-2.5 px-5 font-semibold',
    },
    variant: {
      contained: {
        primary: 'bg-triad-dark-300 hover:bg-triad-dark-300/60 text-white',
        secondary:
          'bg-transparent border border-black hover:bg-legacy-silver-600 text-triad-dark-100',
        tertiary:
          'bg-triad-dark-200 text-triad-dark-150 hover:bg-triad-azure-200 hover:text-white',
        gray: 'bg-triad-gray-400 hover:bg-legacy-green-700 text-white',
        blue: 'bg-triad-azure-200 hover:bg-triad-azure-200/80 text-white',
        purple: 'bg-triad-purple-100 text-triad-purple-200',
        'light-red': 'bg-triad-red-100 text-triad-red-600',
        red: 'bg-triad-red-600 text-white',
      },
      outlined: {
        blue: 'border border-triad-azure-200 hover:bg-triad-azure-200/80 text-triad-azure-200 hover:text-white',
      },
    },
    common:
      'rounded-lg flex items-center justify-center transition duration-200 ease-linear h-fit w-fit outline-none',
    disabled:
      'cursor-not-allowed bg-triad-dark-200 text-triad-dark-450 hover:bg-triad-dark-200',
  };

  const commonClasses = cn(
    className.common,
    className.size[size as keyof typeof className.size],
    variant
      ? (className.variant as { [key: string]: { [key: string]: string } })[
          variant
        ][color]
      : '',
    { [className.disabled]: (rest as { disabled?: boolean }).disabled },
    buttonClassName
  );

  return (
    <button className={cn('gap-x-2', commonClasses)} {...rest}>
      {loading && <IconLoading />}
      {children}
    </button>
  );
}

Button.displayName = 'Button';

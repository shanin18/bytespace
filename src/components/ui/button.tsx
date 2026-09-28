import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from 'radix-ui';

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-[inherit] leading-[inherit] font-[inherit] whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_:where(svg:not([class*='size-']))]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        lime: 'bg-lime text-[#182000] [&:hover]:bg-[#e0ff5c] [&:hover]:shadow-[0_6px_22px_#bbef1d25]',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-[#dedfe6] bg-white text-foreground shadow-xs hover:border-blue hover:text-blue',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        unstyled: '',
        pill: 'px-6 py-3 inline-flex items-center justify-center gap-5 min-h-11.5 rounded-[30px] text-[12px] font-medium whitespace-nowrap leading-[1.4] [&_svg]:shrink-0 [&_svg]:[transition:transform_0.25s] [&:hover_svg]:[transform:translate(2px,_-2px)] [&:hover]:[transform:translateY(-2px)] max-[540px]:px-5 max-[540px]:py-[11px] max-[540px]:text-[11px] max-[540px]:min-h-10.5',
        'pill-sm':
          'px-6 py-3 inline-flex items-center justify-center gap-5 min-h-11.5 rounded-[30px] text-[12px] font-medium whitespace-nowrap leading-[1.4] [&_svg]:shrink-0 [&_svg]:[transition:transform_0.25s] [&:hover_svg]:[transform:translate(2px,_-2px)] [&:hover]:[transform:translateY(-2px)] max-[540px]:px-5 max-[540px]:py-[11px] max-[540px]:text-[11px] max-[540px]:min-h-10.5 px-[17px] py-[9px] min-h-9 gap-3.5 text-[11px] max-[540px]:px-[17px] max-[540px]:py-[9px] max-[540px]:min-h-9 leading-[1.4]',
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_:where(svg:not([class*='size-']))]:size-3",
        sm: 'h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-xs': "size-6 rounded-md [&_:where(svg:not([class*='size-']))]:size-3",
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(
        buttonVariants({ variant, size }),
        'cursor-pointer touch-manipulation disabled:cursor-not-allowed [-webkit-tap-highlight-color:transparent] [&:active:not(:disabled)]:[scale:0.98] [&:focus-visible]:[outline:none] [&:focus-visible]:shadow-[0_0_0_3px_#003be226]',
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };

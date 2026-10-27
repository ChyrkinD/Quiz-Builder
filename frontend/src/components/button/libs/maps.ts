import { ButtonVariant, ComponentSize } from '~/libs/enums/enums';

export const buttonVariantToClasses = {
  [ButtonVariant.PRIMARY]:
    'border-transparent bg-primary text-text-inverse shadow-[0_4px_0_var(--color-primary-strong)] hover:brightness-110 active:translate-y-0.5 active:shadow-[0_2px_0_var(--color-primary-strong)]',
  [ButtonVariant.SECONDARY]:
    'border-border-strong bg-surface text-text shadow-[0_4px_0_var(--color-border-strong)] hover:border-primary hover:text-primary active:translate-y-0.5 active:shadow-[0_2px_0_var(--color-border-strong)]',
  [ButtonVariant.GHOST]: 'border-transparent bg-transparent text-primary hover:bg-primary-soft',
  [ButtonVariant.DANGER]:
    'border-transparent bg-danger text-text-inverse shadow-[0_4px_0_var(--color-danger-strong)] hover:brightness-110 active:translate-y-0.5 active:shadow-[0_2px_0_var(--color-danger-strong)]',
} satisfies Record<ButtonVariant, string>;

export const buttonSizeToClasses = {
  [ComponentSize.MD]: 'rounded-md px-5 py-2.5 text-base',
  [ComponentSize.SM]: 'rounded-sm px-3.5 py-1.5 text-sm',
} satisfies Record<ComponentSize, string>;

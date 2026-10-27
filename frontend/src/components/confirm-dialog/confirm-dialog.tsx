import { type FC, useEffect, useId, useRef } from 'react';

import { Button } from '~/components/button/button';
import { Icon } from '~/components/icon/icon';
import { ButtonVariant, IconName } from '~/libs/enums/enums';

type Properties = {
  cancelLabel?: string | undefined;
  confirmLabel: string;
  description: string;
  isOpen: boolean;
  isPending?: boolean | undefined;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmDialog: FC<Properties> = ({
  cancelLabel = 'Cancel',
  confirmLabel,
  description,
  isOpen,
  isPending = false,
  title,
  onCancel,
  onConfirm,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }

    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog
      aria-describedby={descriptionId}
      aria-labelledby={titleId}
      className="m-auto w-[calc(100%-32px)] max-w-105 rounded-xl bg-surface p-6 text-text shadow-raised backdrop:bg-text/40"
      ref={dialogRef}
      onCancel={(event) => {
        event.preventDefault();

        if (!isPending) {
          onCancel();
        }
      }}
    >
      <div className="flex flex-col gap-4">
        <span className="flex size-12 items-center justify-center rounded-full bg-danger-soft text-danger">
          <Icon className="size-5.5" iconName={IconName.TRASH} />
        </span>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-2xl font-extrabold" id={titleId}>
            {title}
          </h2>
          <p className="text-base text-text-muted" id={descriptionId}>
            {description}
          </p>
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button isDisabled={isPending} variant={ButtonVariant.SECONDARY} onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button isDisabled={isPending} variant={ButtonVariant.DANGER} onClick={onConfirm}>
            {isPending ? 'Deleting…' : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
};

export { ConfirmDialog };

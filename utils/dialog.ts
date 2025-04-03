import { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';

export const closeDialog = () => {
  const dialog = document.querySelector('dialog')!;
  dialog.style.animation = 'slideOutEffect 300ms ease-in-out';
  const controller = new AbortController();

  dialog.addEventListener(
    'animationend',
    () => {
      dialog.close();
      dialog.remove();
      controller.abort();
    },
    { once: true, signal: controller.signal }
  );
};

export const showDialog = ({
  content,
  dialogWidth,
}: {
  content: ReactNode;
  dialogWidth?: string;
}) => {
  const dialog = document.createElement('dialog');
  const root = createRoot(dialog);
  const controller = new AbortController();
  document.body.appendChild(dialog);
  root.render(content);
  dialog.style.width = dialogWidth!;
  dialog.showModal();

  const closeDialogWithAnimation = () => {
    dialog.style.animation = 'slideOutEffect 300ms ease-in-out';

    dialog.addEventListener(
      'animationend',
      () => {
        dialog.close();
        dialog.remove();
        root.unmount();
        controller.abort();
      },
      { once: true, signal: controller.signal }
    );
  };

  dialog.addEventListener(
    'click',
    (event: MouseEvent) => {
      const firstChildDialog = document.querySelector('dialog')?.children[0];
      if (dialog.open && !firstChildDialog?.contains(event.target as Node)) {
        closeDialogWithAnimation();
      }
    },
    { once: true, signal: controller.signal }
  );
};

import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import styles from "./Dialog.module.scss";

type Props = {
  children: ReactNode;
  trigger: ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Dialog({ children, trigger, open, setOpen }: Props) {
  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content className={styles.content}>
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

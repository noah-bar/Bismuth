import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/use-i18n';

type ConfirmOptions = {
    title?: string;
    description?: string;
};

type ConfirmContextType = {
    confirm: (options?: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

type ConfirmProviderProps = {
    children: ReactNode;
};

export function ConfirmProvider({ children }: ConfirmProviderProps) {
    const { t } = useI18n();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const resolverRef = useRef<((value: boolean) => void) | null>(null);

    const confirm = useCallback(
        (options?: ConfirmOptions): Promise<boolean> => {
            setTitle(options?.title || t('components.confirm-dialog.default_title'));
            setDescription(options?.description || t('components.confirm-dialog.default_description'));
            setIsOpen(true);

            return new Promise<boolean>((resolve) => {
                resolverRef.current = resolve;
            });
        },
        [t]
    );

    const handleConfirm = useCallback(() => {
        setIsOpen(false);
        if (resolverRef.current) {
            resolverRef.current(true);
            resolverRef.current = null;
        }
    }, []);

    const handleCancel = useCallback(() => {
        setIsOpen(false);
        if (resolverRef.current) {
            resolverRef.current(false);
            resolverRef.current = null;
        }
    }, []);

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <Dialog open={isOpen} onOpenChange={(open) => !open && handleCancel()}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleCancel}>
                            {t('components.confirm-dialog.actions.cancel')}
                        </Button>
                        <Button onClick={handleConfirm}>
                            {t('components.confirm-dialog.actions.confirm')}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmProvider');
    }
    return context;
}

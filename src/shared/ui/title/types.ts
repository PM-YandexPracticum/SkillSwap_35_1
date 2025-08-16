import type { ElementType, ReactNode } from "react";

export type TitleProps = {
    children: ReactNode;
    as: ElementType;
    size: 16 | 20 | 24 | 32;
    family?: 'Jost' | 'Roboto';
    align?: 'center' | 'left';
}
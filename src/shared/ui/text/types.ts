import type { ElementType, ReactNode } from "react";

export type TextProps = {
    children: ReactNode;
    as: ElementType;
    size: 12 | 16;
    color?: 'textMain' | 'textCaption' | 'textDisabled' | 'textLink' | 'textError'
}
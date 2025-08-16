import type { TitleProps } from "./types";

import styles from './title.module.scss'

export const Title = ({
    children,
    as: Tag = 'h1',
    size = 32,
    align = 'left'
}: TitleProps) => {
    const className = `${styles.title} ${styles[`size${size}`]} ${styles[`${align}`]}`;
    
    return <Tag className={className}>{children}</Tag>
}
import type { TextProps } from "./types";
import styles from './text.module.scss'

export const Text = ({
    children,
    as: Tag = 'div',
    size = 12,
    color = 'textMain'
}: TextProps) => {
    const className = `${styles.text} ${styles[`size${size}`]} ${styles[`${color}`]}`
    return <Tag className={className}>{children}</Tag>
}
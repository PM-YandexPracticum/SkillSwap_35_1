import { useState } from "react";
import styles from "./ExpendableMenu.module.scss";

type ExpendableMenuProps = {
  title: string;
  maxCount?: number;
  buttonText?: string;
  collapseText?: string;
  children: React.ReactNode;
};

const ExpendableMenu = ({
  title,
  maxCount = 3,
  buttonText = "Показать все",
  collapseText = "Свернуть",
  children,
}: ExpendableMenuProps) => {
  const [expanded, setExpanded] = useState(false);

  const items = Array.isArray(children) ? children : [children];
  const visibleItems = expanded ? items : items.slice(0, maxCount);

  return (
    <div className={styles.menu}>
      {title && <h4 className={styles.title}>{title}</h4>}

      <ul className={styles.list}>
        {visibleItems.map((child, idx) => (
          <li key={idx} className={styles.item}>
            {child}
          </li>
        ))}
      </ul>

      {items.length > maxCount && (
        <button
          type="button"
          className={`${styles.toggle} ${expanded ? styles.open : ""}`}
          onClick={() => setExpanded((p) => !p)}
        >
          {expanded ? collapseText : buttonText}
          <span className={styles.arrow} />
        </button>
      )}
    </div>
  );
};

export default ExpendableMenu;

import { useState } from "react";
import styles from "./ExpendableMenu.module.scss";

type ExpendableMenuProps = {
  title: string;
  items: string[];
  visibleCount?: number;
  collapsedLabel: string;
  onSelect?: (value: string | string[]) => void;
  multiple?: boolean; // true — несколько (checkbox), false — один (radio)
};

const ExpendableMenu = ({
  title,
  items,
  visibleCount = 3,
  collapsedLabel,
  onSelect,
  multiple = false,
}: ExpendableMenuProps) => {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const visibleItems = expanded ? items : items.slice(0, visibleCount);

  const handleSelect = (item: string) => {
    let next: string[] = [];

    if (multiple) {
      next = selected.includes(item)
        ? selected.filter((s) => s !== item)
        : [...selected, item];
      onSelect?.(next);
    } else {
      next = [item];
      onSelect?.(item);
    }

    setSelected(next);
  };

  return (
    <div className={styles.menu}>
      {title && <h4 className={styles.title}>{title}</h4>}

      <ul className={styles.list}>
        {visibleItems.map((item) => {
          const isActive = selected.includes(item);
          return (
            <li
              key={item}
              className={styles.item}
              onClick={() => handleSelect(item)}
            >
              <span
                className={`${styles.icon} ${
                  multiple ? styles.checkbox : styles.radio
                } ${isActive ? styles.checked : ""}`}
              >
                {isActive &&
                  (multiple ? (
                    <span className={styles.tick} />
                  ) : (
                    <span className={styles.dot} />
                  ))}
              </span>
              <span className={styles.label}>{item}</span>
            </li>
          );
        })}
      </ul>

      {items.length > visibleCount && (
        <button
          type="button"
          className={`${styles.toggle} ${expanded ? styles.open : ""}`}
          onClick={() => setExpanded((p) => !p)}
        >
          {expanded ? "Свернуть" : collapsedLabel}
          <span className={styles.arrow} />
        </button>
      )}
    </div>
  );
};

export default ExpendableMenu;

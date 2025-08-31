import { useState, Children } from "react";
import type { ExpendableMenuProps } from "./ExpendableMenu.types";

import { Text } from "../text/Text";
import ChevronDown from "../../assets/icons/ui/chevron-down.svg?react";

import styles from "./ExpendableMenu.module.scss";

const ExpendableMenu = ({ children, maxCount = 3, collapsedLabel }: ExpendableMenuProps) => {
  const [expanded, setExpanded] = useState(false);

  const items = Children.toArray(children);
  const visibleItems = expanded ? items : items.slice(0, maxCount);

  return (
    <div className={styles.menu}>
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
          className={styles.toggle}
          onClick={() => setExpanded((p) => !p)}
        >
          <Text tag='span' size='main' color='mainColorText'>
            {expanded ? "Свернуть" : collapsedLabel}
          </Text>
          <ChevronDown
            className={`${styles.arrow} ${expanded ? styles.open : ""}`}
          />
        </button>
      )}
    </div>
  );
};

export default ExpendableMenu;

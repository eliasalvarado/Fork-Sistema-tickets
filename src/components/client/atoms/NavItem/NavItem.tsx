import React from "react";
import { NavItemProps } from "./types";
import { Icon } from "../../atoms/Icon";
import styles from "./NavItem.module.scss";
import classNames from "classnames";

export const NavItem = ({ 
    iconName, 
    label, 
    active = false, 
    onClick,
    className 
}: NavItemProps) => {
    return (
        <button 
            className={classNames(
                styles.navItem, 
                { [styles.active]: active }, 
                className
            )}
            onClick={onClick}
            type="button"
        >
            <Icon 
                name={iconName} 
                variant="navigation" 
                active={active}
                size={32}
            />
            <span className={styles.label}>{label}</span>
        </button>
    );
};

export default NavItem;
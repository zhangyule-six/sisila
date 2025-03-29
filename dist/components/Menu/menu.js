import React, { createContext, useState, } from "react";
import classNames from "classnames";
export const MenuContext = createContext({ index: "0" });
export const Menu = (props) => {
    const { className, mode = "horizontal", style, children, defaultIndex = "0", onSelect, defaultOpenSubMenus = [], } = props;
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames(" sisila-menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    const handleClick = (index) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const passedContext = {
        index: currentActive,
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    };
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child;
            const { displayName } = childElement.type;
            if (displayName === "MenuItem" || displayName === "SubMenu") {
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error("Warnning : Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (React.createElement("ul", { className: classes, style: style, "data-testid": "test-menu" },
        React.createElement(MenuContext.Provider, { value: passedContext }, renderChildren())));
};
export default Menu;

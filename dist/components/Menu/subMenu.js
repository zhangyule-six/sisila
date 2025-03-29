import classNames from "classnames";
import React, { useContext, useState, } from "react";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import CSSTransition from "react-transition-group/CSSTransition";
export const SubMenu = ({ title, index, className, children, }) => {
    const context = useContext(MenuContext);
    const nodeRef = React.useRef(null);
    const OpenedSubMenus = context.defaultOpenSubMenus;
    const isOpened = index && context.mode === "vertical"
        ? OpenedSubMenus.includes(index)
        : false;
    const [menuOpen, setOpen] = useState(isOpened);
    const classes = classNames("menu-item submenu-item", className, {
        "is-active": context.index === index,
        "is-opened": menuOpen,
        "is-vertical": context.mode === "vertical",
    });
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    let timer;
    const handleMouse = (e, toggle) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    };
    //整合以上两个handle
    const clickEvents = context.mode === "vertical"
        ? {
            onclick: handleClick,
        }
        : {};
    const hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: (e) => {
                handleMouse(e, true);
            },
            onMouseLeave: (e) => {
                handleMouse(e, false);
            },
        }
        : {};
    const renderChildren = () => {
        const subMenuClasses = classNames("sisila-submenu", {
            "menu-opened": menuOpen,
        });
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child;
            if (childElement.type.displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`,
                });
            }
            else {
                console.error("Warnning : Menu has a child which is not a MenuItem component");
            }
        });
        return (
        // <Transition
        //   in={menuOpen}
        //   timeout={300}
        //   animation="zoom-in-left"
        //   nodeRef={nodeRef}
        // >
        //   <ul className={subMenuClasses}>{childrenComponent}</ul>
        // </Transition>
        React.createElement(CSSTransition, { in: menuOpen, timeout: 300, classNames: "zoom-in-top", nodeRef: nodeRef },
            React.createElement("ul", { ref: nodeRef, className: subMenuClasses }, childrenComponent)));
    };
    return (React.createElement("li", Object.assign({ key: index, className: classes }, hoverEvents),
        React.createElement("div", Object.assign({ className: "submenu-title", onClick: handleClick }, clickEvents),
            title,
            React.createElement(Icon, { icon: "angle-down", className: "arrow-icon" })),
        renderChildren()));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;

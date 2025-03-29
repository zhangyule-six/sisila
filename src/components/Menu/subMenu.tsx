import classNames from "classnames";
import React, {
  FunctionComponent,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import CSSTransition from "react-transition-group/CSSTransition";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: ReactNode;
}

export const SubMenu: React.FC<SubMenuProps> = ({
  title,
  index,
  className,
  children,
}) => {
  const context = useContext(MenuContext);
  const nodeRef = React.useRef(null);
  const OpenedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === "vertical"
      ? OpenedSubMenus.includes(index)
      : false;

  const [menuOpen, setOpen] = useState(isOpened);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  //整合以上两个handle
  const clickEvents =
    context.mode === "vertical"
      ? {
          onclick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames("sisila-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as ReactElement<
        MenuItemProps,
        FunctionComponent
      >;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          "Warnning : Menu has a child which is not a MenuItem component"
        );
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
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
        nodeRef={nodeRef}
      >
        <ul ref={nodeRef} className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;

import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import CSSTransition from "react-transition-group/CSSTransition";
import React from "react";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
  children?: React.ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
    wrapper,
    unmountOnExit = true,
    appear = true,
    ...restProps
  } = props;
  return (
    <CSSTransition
      classNames={classNames ? classNames : animation}
      {...restProps}
    >
      {children}
    </CSSTransition>
  );
};

export default Transition;

import { PropsWithChildren } from "react";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";
import CSSTransition from "react-transition-group/CSSTransition";
type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  children: React.ReactNode;
};
const Transition: React.FC<TransitionProps> = (props) => {
  const {
    children,
    classNames,
    animation,
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

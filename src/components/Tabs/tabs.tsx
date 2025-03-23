import { PropsWithChildren, useState } from "react";

interface TabProps {
  defaultIndex?: string;
  className: string;
  title?: string;
  onSelect?: (selectedIndex: string) => void;
}

const Tabs: React.FC<PropsWithChildren<TabProps>> = (props) => {
  const { defaultIndex = "0", className, onSelect, children } = props;

  const [select, setSelect] = useState(defaultIndex);

  return (
    <table>
      <tr>{children}</tr>
    </table>
  );
};

export default Tabs;

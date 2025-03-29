import { PropsWithChildren } from "react";
interface TabProps {
    defaultIndex?: string;
    className: string;
    title?: string;
    onSelect?: (selectedIndex: string) => void;
}
declare const Tabs: React.FC<PropsWithChildren<TabProps>>;
export default Tabs;

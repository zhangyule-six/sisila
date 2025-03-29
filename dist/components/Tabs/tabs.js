import { useState } from "react";
var Tabs = function (props) {
    var _a = props.defaultIndex, defaultIndex = _a === void 0 ? "0" : _a, className = props.className, onSelect = props.onSelect, children = props.children;
    var _b = useState(defaultIndex), select = _b[0], setSelect = _b[1];
    return (React.createElement("table", null,
        React.createElement("tr", null, children)));
};
export default Tabs;

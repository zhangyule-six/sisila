var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { useEffect, useState, useRef, } from "react";
import React from "react";
import { Input } from "../Input/input";
import Icon from "../Icon/icon";
import useDebounce from "../../hooks/useDebounce";
import classNames from "classnames";
import useClickOutside from "../../hooks/useClickOutside";
import { Transition } from "react-transition-group";
export const AutoComplete = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption } = props, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef(null);
    const debouncedValue = useDebounce(inputValue, 500);
    useClickOutside(componentRef, () => {
        setSuggestions([]);
    });
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue);
            if (results instanceof Promise) {
                console.log("triggered");
                setLoading(true);
                results.then((data) => {
                    setLoading(false);
                    setSuggestions(data || []);
                });
            }
            else {
                setSuggestions(results);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    const highlight = (index) => {
        if (index < 0)
            index = 0;
        if (index > suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    const handleKeyDown = (e) => {
        switch (e.code) {
            case "Enter":
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case "ArrowUp":
                highlight(highlightIndex - 1);
                break;
            case "ArrowDown":
                highlight(highlightIndex + 1);
                break;
            case "Escape":
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    const handleChange = (e) => {
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };
    const handleSelect = (item) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };
    const renderTemplate = (item) => {
        return renderOption ? renderOption(item) : item.value;
    };
    const generateDropdown = () => {
        return (React.createElement(Transition, { in: loading, animation: "zoom-in-top", timeout: 300, onExited: () => {
                setSuggestions([]);
            } },
            React.createElement("ul", { className: "sisila-auto-complete" },
                loading && (React.createElement("div", { className: "suggstions-loading-icon" },
                    React.createElement(Icon, { icon: "spinner", spin: true }))),
                suggestions.map((item, index) => {
                    const cnames = classNames("suggestion-index", {
                        //"item-highlighted": index === highlightIndex,
                        "is-active": index === highlightIndex,
                    });
                    return (React.createElement("li", { key: index, className: cnames, onClick: () => handleSelect(item) }, renderTemplate(item)));
                }))));
    };
    return (React.createElement("div", { className: "sisila-auto-complete", ref: componentRef },
        React.createElement(Input, Object.assign({ value: inputValue, onChange: handleChange }, restProps, { onKeyDown: handleKeyDown })),
        suggestions.length > 0 && generateDropdown()));
};

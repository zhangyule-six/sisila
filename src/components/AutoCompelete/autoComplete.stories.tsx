import { Meta } from "@storybook/react/*";
import { AutoComplete, DataSourceType } from "./autoComplete";
import { action } from "@storybook/addon-actions";

interface LakerPlayerProps {
  value: string;
  number?: number;
}

export default {
  title: "AutoComplete 组件",
  component: AutoComplete,
  id: "AutoComplete",
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
} as Meta<typeof AutoComplete>;

export const SimpleComplete = () => {
  const numberones = ["lars", "sk", "pyx", "gwt", "jojo", "zjw", "qsj", "smm"];
  const lakersWithNumber: DataSourceType<LakerPlayerProps>[] = [
    { value: "bradley", number: 11 },
    { value: "pope", number: 1 },
    { value: "caruso", number: 4 },
    { value: "cook", number: 2 },
    { value: "cousins", number: 15 },
    { value: "james", number: 23 },
    { value: "AD", number: 3 },
    { value: "green", number: 14 },
    { value: "howard", number: 39 },
    { value: "kuzma", number: 0 },
  ];
  // const handleFetch = (query: string) => {
  //   return numberones
  //     .filter((name) => name.includes(query))
  //     .map((name) => ({ value: name }));
  // };
  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter((player) => player.value.includes(query));
  // };

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const renderOption = (item: DataSourceType<LakerPlayerProps>) => {
    return (
      <>
        <h2>Name:{item.value}</h2>
        <p>Number:{item.number}</p>
      </>
    );
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action("selected")}
      renderOption={renderOption}
    />
  );
};

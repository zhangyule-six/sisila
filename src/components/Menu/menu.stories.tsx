import { Meta, StoryFn } from "@storybook/react";
import Menu from "./menu";
import SubMenu from "./subMenu";
import MenuItem from "./menuItem";

const menuMeta: Meta<typeof Menu> = {
  title: "第五章：Menu",
  id: "Menu",
  component: Menu,
  subcomponents: { SubMenu: SubMenu, Item: MenuItem },
  args: {
    defaultIndex: "1",
  },
};
export default menuMeta;

export const Template: StoryFn<typeof Menu> = (args) => (
  <Menu {...args}>
    <MenuItem>cool link</MenuItem>
    <MenuItem>cool link2</MenuItem>
    <MenuItem disabled>disabled</MenuItem>
    <SubMenu title="下拉选项">
      <MenuItem>下拉选项一</MenuItem>
      <MenuItem>下拉选项二</MenuItem>
    </SubMenu>
  </Menu>
);

export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认Menu";
DefaultMenu.decorators = [
  (Story) => (
    <div style={{ margin: "50px" }}>
      <Story />
    </div>
  ),
];

export const ClickMenu = Template.bind({});
ClickMenu.args = {
  defaultIndex: "0",
  mode: "vertical",
};
ClickMenu.argTypes = {
  defaultIndex: {
    control: "color",
  },
};
ClickMenu.parameters = {
  backgrounds: {
    values: [
      { name: "red", value: "#f00" },
      { name: "green", value: "#0f0" },
    ],
  },
};
ClickMenu.storyName = "纵向的 Menu";

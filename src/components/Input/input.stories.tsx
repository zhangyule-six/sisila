import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { Input } from "./input";

const ControlledInput = () => {
  const [value, setValue] = useState("");
  return (
    <Input
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    ></Input>
  );
};

export default {
  title: "第九章：Input",
  id: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;
export const ADefault = Template.bind({});
ADefault.args = {
  placeholder: "漂亮的 Input",
};
ADefault.storyName = "默认的 Input";
export const BDisabled = Template.bind({});
BDisabled.args = {
  placeholder: "disabled input",
  disabled: true,
};
BDisabled.storyName = "被禁用的 Input";

export const CIcon = Template.bind({});
CIcon.args = {
  placeholder: "input with icon",
  icon: "search",
};
CIcon.storyName = "带图标的 Input";

export const DSizeInput = () => (
  <>
    <Input defaultValue="large size" size="lg" />
    <Input placeholder="small size" size="sm" />
  </>
);
DSizeInput.storyName = "大小不同的 Input";
export const EPandInput = () => (
  <>
    <Input defaultValue="prepend text" prepend="https://" />
    <Input defaultValue="google" append=".com" />
  </>
);

EPandInput.storyName = "带前后缀的 Input";

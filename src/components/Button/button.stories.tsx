import React from "react";
import Button from "./button";
import { Meta, StoryFn, StoryObj } from "@storybook/react";
import mdx from "./button.mdx";

const buttonMeta: Meta<typeof Button> = {
  title: "第四章：Button",
  component: Button,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};
export default buttonMeta;

//type Story = StoryObj<typeof Button>;

export const Template: StoryFn = (args) => <Button {...args}></Button>;
export const Default = Template.bind({});
Default.args = {
  children: "Default Button",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
  children: "Large Button",
};
export const Small = Template.bind({});
Small.args = {
  size: "sm",
  children: "Small Button",
};
export const Primary = Template.bind({});
Primary.args = {
  btnType: "primary",
  children: "Primary Button",
};
export const Danger = Template.bind({});
Danger.args = {
  btnType: "danger",
  children: "Danger Button",
};
export const Link = Template.bind({});
Link.args = {
  btnType: "link",
  children: "Link Button",
  href: "https://google.com",
};

// export const Default: Story = {
//   render: () => <Button>Default Button</Button>,
// };

//Default.storyName = "默认按钮样式";

// export const ButtonWithSize: Story = {
//   render: (args) => (
//     <>
//       <Button size="lg" {...args}>
//         Large Button
//       </Button>
//       <Button size="sm" {...args}>
//         Large Button
//       </Button>
//     </>
//   ),
// };
// ButtonWithSize.storyName = "不同尺寸的按钮";

// export const ButtonWithType: Story = {
//   render: () => (
//     <>
//       <Button btnType="primary"> primary button </Button>
//       <Button btnType="danger"> danger button </Button>
//       <Button btnType="link" href="https://google.com">
//         {" "}
//         link button{" "}
//       </Button>
//     </>
//   ),
// };

// ButtonWithType.storyName = "不同类型的按钮";

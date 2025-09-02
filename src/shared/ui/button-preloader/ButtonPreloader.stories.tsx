import type { Meta, StoryObj } from "@storybook/react";
import { ButtonPreloader } from "./ButtonPreloader";

const meta: Meta<typeof ButtonPreloader> = {
  title: "Components/ButtonPreloader",
  component: ButtonPreloader,
};

export default meta;
type Story = StoryObj<typeof ButtonPreloader>;

export const Default: Story = {
  render: () => <ButtonPreloader />,
};

export const OnButton: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "284px",
        height: "48px",
        borderRadius: "12px",
        backgroundColor: "#abd27a"
      }}
    >
      <ButtonPreloader />
    </div>
  ),
};
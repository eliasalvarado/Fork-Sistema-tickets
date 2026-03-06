import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MaintenanceCard } from "./index";

const meta: Meta<typeof MaintenanceCard> = {
    title: "Organisms/MaintenanceCard",
    component: MaintenanceCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        lastMaintenance: "28/11/2023",
        nextMaintenance: "28/11/2023",
        observations: "Ejemplo de una descripcion, limpieza de cpu, cambio de baterias."
    },
};
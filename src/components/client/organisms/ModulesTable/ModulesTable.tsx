import { ModulesTableProps } from "./types";
import styles from "./ModulesTable.module.scss";
import classNames from "classnames";
import { TableHeader } from "../../molecules/TableHeader";
import { TableRow } from "../../molecules/TableRow";
import { Text } from "../../atoms/Text";
import { Chip } from "../../atoms/Chip";
import { IconButton } from "../../atoms/IconButton";

const GRID = "minmax(0,1fr) minmax(0,1.8fr) minmax(0,1fr) minmax(0,1fr)";

const ModulesTable: React.FC<ModulesTableProps> = ({
    modules,
    className
}) => {
    return (
        <div className={classNames(styles.ModulesTable, className)}>
            <TableHeader 
                iconName="layer-group-solid"
                label="Modulos del sistema"
            />

            <div className={styles.table}>

                <TableRow 
                    isHeader
                    gridTemplate={GRID}
                    cells={[
                        { icon: "hashtag-solid", label: "Código" },
                        { icon: "clipboard-solid", label: "Nombre del módulo" },
                        { icon: "spinner-solid", label: "Estado" },
                        { icon: "gears-solid", label: "", align: "center" }
                    ]}
                />

                {modules.map((mod) => (
                    <TableRow 
                        key={mod.id}
                        id={mod.id}
                        gridTemplate={GRID}
                        scale={0.9}
                        cells={[
                            { content: <Text>{mod.id}</Text> },
                            { content: <Text>{mod.name}</Text> },
                            {
                                content: (
                                    <Chip label={mod.status} state="ingressed" />
                                ), 
                                align: "center"
                            },
                            {
                                content: (
                                    <div>
                                        <IconButton icon="trash-solid" />
                                        <IconButton icon="file-pen-solid" />
                                    </div>
                                ),
                                align: "center"
                            }
                        ]}
                    />
                ))}

            </div>
        </div>
    );
};

export default ModulesTable;
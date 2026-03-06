import React from "react";
import { MaintenanceCardProps } from "./types";
import { Text } from "../../atoms/Text";
import { Icon } from "../../atoms/Icon";
import styles from "./MaintenanceCard.module.scss";
import classNames from "classnames";
import { Title } from "../../atoms/Title";

export const MaintenanceCard = ({
    lastMaintenance,
    nextMaintenance,
    observations,
    className
}: MaintenanceCardProps) => {
    return (
        <div className={classNames(styles.card, className)}>
            <Title className={styles.title}>
                Registros de Mantenimiento
            </Title>

            <div className={styles.records}>
                {/* Fila: Último Mantenimiento */}
                <div className={styles.row}>
                    <Text variant="body" className={styles.label}>
                        Ultimo Mantenimiento:
                    </Text>
                    <div className={styles.dateInfo}>
                        <Icon name="calendar-regular" size={20} color="#A9A9A9" />
                        <Text variant="muted">{lastMaintenance}</Text>
                    </div>
                </div>

                {/* Fila: Próximo Mantenimiento */}
                <div className={styles.row}>
                    <Text variant="body" className={styles.label}>
                        Proximo Mantenimiento:
                    </Text>
                    <div className={styles.dateInfo}>
                        <Icon name="calendar-regular" size={20} color="#A9A9A9" />
                        <Text variant="muted">{nextMaintenance}</Text>
                    </div>
                </div>
            </div>

            <div className={styles.observationsSection}>
                <Text variant="body" className={styles.obsLabel}>
                    Observaciones:
                </Text>
                <Text variant="muted" className={styles.obsContent}>
                    {observations}
                </Text>
            </div>
        </div>
    );
};

export default MaintenanceCard;
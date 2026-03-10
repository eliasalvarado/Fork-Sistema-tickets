"use client";

import React, { useState, useMemo } from "react";
import classNames from "classnames";
import { TableRow } from "../../molecules/TableRow";
import { TicketsFilterBar } from "../TicketsFilterBar";
import { ModalContent } from "../../molecules/ModalContent";
import { Avatar } from "../../atoms/Avatar";
import { Text } from "../../atoms/Text";
import { Chip } from "../../atoms/Chip";
import { AssignedChip } from "../../molecules/AssignedChip";
import { IconButton } from "../../atoms/IconButton";
import type { TicketsTablePanelProps, Ticket } from "./types";
import styles from "./TicketsTablePanel.module.scss";

// Constantes
const COMMON_GRID = "minmax(0, 1.8fr) minmax(0, 1fr) minmax(0, 1.4fr) minmax(0, 0.6fr) minmax(0, 0.9fr) minmax(0, 1.2fr) minmax(0, 1fr)";

const FILTER_OPTIONS = [
  { label: "Asignados", value: "assigned", icon: "user-tag-solid" as const },
  { label: "Cancelados", value: "cancelled", icon: "xmark-solid" as const },
];

/**
 * Componente TicketsTablePanel - Tabla completa de tickets con filtros y acciones
 *
 * @param {TicketsTablePanelProps} props - Las propiedades del componente
 * @returns {JSX.Element} El componente TicketsTablePanel renderizado
 */
export const TicketsTablePanel: React.FC<TicketsTablePanelProps> = ({
  tickets,
  onDelete,
  onExport,
  loading = false,
  className,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [selectedMemberId, setSelectedMemberId] = useState<string | number | undefined>();
  const [ticketToDelete, setTicketToDelete] = useState<string | number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Extraer miembros únicos de los tickets para el filtro
  const members = useMemo(() => {
    const uniqueUsers = new Map();
    
    tickets.forEach(ticket => {
      if (!uniqueUsers.has(ticket.user.id)) {
        uniqueUsers.set(ticket.user.id, {
          id: ticket.user.id,
          name: ticket.user.name,
          initials: ticket.user.initials,
          avatarSrc: ticket.user.avatarSrc,
        });
      }
      
      if (ticket.assignedTo && !uniqueUsers.has(ticket.assignedTo.id)) {
        uniqueUsers.set(ticket.assignedTo.id, {
          id: ticket.assignedTo.id,
          name: ticket.assignedTo.name,
          initials: ticket.assignedTo.initials,
          avatarSrc: ticket.assignedTo.avatarSrc,
        });
      }
    });
    
    return Array.from(uniqueUsers.values());
  }, [tickets]);

  // Filtrar tickets según el filtro seleccionado y el miembro seleccionado
  const filteredTickets = useMemo(() => {
    let filtered = tickets;

    // Filtrar por tipo (Asignados/Cancelados)
    if (selectedFilter === "assigned") {
      filtered = filtered.filter(ticket => ticket.assignedTo !== null && ticket.assignedTo !== undefined);
    } else if (selectedFilter === "cancelled") {
      filtered = filtered.filter(ticket => ticket.status.state === "canceled");
    }

    // Filtrar por miembro seleccionado
    if (selectedMemberId) {
      filtered = filtered.filter(ticket => 
        ticket.user.id === selectedMemberId || 
        ticket.assignedTo?.id === selectedMemberId
      );
    }

    return filtered;
  }, [tickets, selectedFilter, selectedMemberId]);

  // Manejar apertura del modal de eliminación
  const handleDeleteClick = (ticketId: string | number) => {
    setTicketToDelete(ticketId);
    setIsDeleteModalOpen(true);
  };

  // Confirmar eliminación
  const handleConfirmDelete = () => {
    if (ticketToDelete !== null) {
      onDelete?.(ticketToDelete);
      setIsDeleteModalOpen(false);
      setTicketToDelete(null);
    }
  };

  // Cancelar eliminación
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setTicketToDelete(null);
  };

  // Renderizar una fila de ticket
  const renderTicketRow = (ticket: Ticket) => {
    return (
      <TableRow
        key={ticket.id}
        gridTemplate={COMMON_GRID}
        scale={0.8}
        cells={[
          {
            content: (
              <div className={styles.userMenu}>
                <Avatar
                  initials={ticket.user.initials}
                  src={ticket.user.avatarSrc}
                  size="sm"
                />
                <div className={styles.info}>
                  <Text variant="body" className={styles.name}>
                    {ticket.user.name}
                  </Text>
                  <Text variant="caption" className={styles.role}>
                    {ticket.user.department}
                  </Text>
                </div>
              </div>
            ),
          },
          { content: <Text variant="muted">{ticket.title}</Text> },
          { content: <Text variant="muted">{ticket.description}</Text> },
          { content: <Text variant="muted">{ticket.date}</Text> },
          {
            content: <Chip label={ticket.status.label} state={ticket.status.state} />,
            align: "center",
          },
          {
            content: (
              <AssignedChip
                assigned={!!ticket.assignedTo}
                userName={ticket.assignedTo?.name}
                avatarSrc={ticket.assignedTo?.avatarSrc}
                avatarInitials={ticket.assignedTo?.initials}
              />
            ),
            align: "center",
          },
          {
            content: (
              <IconButton
                icon="trash-solid"
                size={24}
                iconColor="#BDBDBD"
                onClick={() => handleDeleteClick(ticket.id)}
              />
            ),
            align: "center",
          },
        ]}
      />
    );
  };

  return (
    <div className={classNames(styles.TicketsTablePanel, className)}>
      {/* Barra de filtros */}
      <TicketsFilterBar
        filterOptions={FILTER_OPTIONS}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        onExport={onExport || (() => {})}
        members={members}
        selectedMemberId={selectedMemberId}
        onMemberSelect={(member) => setSelectedMemberId(member?.id)}
        disabled={loading}
      />

      {/* Tabla de tickets */}
      <div className={styles.tableContainer}>
        {/* Header */}
        <TableRow
          isHeader
          gridTemplate={COMMON_GRID}
          cells={[
            { icon: "user-regular", label: "Usuario" },
            { icon: "clipboard-regular", label: "Titulo" },
            { icon: "file-lines-regular", label: "Descripción" },
            { icon: "calendar-regular", label: "Fecha" },
            { icon: "magnifying-glass-solid", label: "Status Actual" },
            { icon: "circle-user-regular", label: "Asignación" },
            { icon: "hand-regular", label: "Acciones" },
          ]}
        />

        {/* Filas de datos */}
        {loading ? (
          <div className={styles.loadingState}>
            <Text variant="muted">Cargando tickets...</Text>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className={styles.emptyState}>
            <Text variant="muted">No hay tickets para mostrar</Text>
          </div>
        ) : (
          filteredTickets.map(renderTicketRow)
        )}
      </div>

      {/* Modal de confirmación de eliminación */}
      <ModalContent
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Cancelar"
        description="Estas seguro de cancelar este ticket, este ticket lo encontraras en el apartado de cancelados"
        confirmLabel="Confirmar"
        cancelLabel="Cancelar"
      />
    </div>
  );
};

export default TicketsTablePanel;

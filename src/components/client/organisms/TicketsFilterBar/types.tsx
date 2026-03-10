import { FilterOption } from "../../molecules/IconFilterTabs/types";
import { Member } from "../../molecules/MemberSelect/types";

/**
 * Props del componente TicketsFilterBar
 */
export interface TicketsFilterBarProps {
  /**
   * Opciones de filtro adicionales para IconFilterTabs
   * La opción "Todos" se agrega automáticamente
   */
  filterOptions?: FilterOption[];

  /**
   * Valor del filtro seleccionado actualmente
   */
  selectedFilter: string;

  /**
   * Callback cuando cambia el filtro
   */
  onFilterChange: (value: string) => void;

  /**
   * Callback cuando se presiona el botón Exportar
   */
  onExport: () => void;

  /**
   * Lista de miembros disponibles para filtrar por persona
   */
  members: Member[];

  /**
   * ID del miembro seleccionado actualmente para filtrar
   */
  selectedMemberId?: string | number;

  /**
   * Callback cuando se selecciona o deselecciona un miembro para filtrar
   * Si member es undefined, significa que se quitó el filtro
   */
  onMemberSelect: (member: Member | undefined) => void;

  /**
   * Si los controles están deshabilitados
   * @default false
   */
  disabled?: boolean;

  /**
   * Clase CSS adicional
   */
  className?: string;
}

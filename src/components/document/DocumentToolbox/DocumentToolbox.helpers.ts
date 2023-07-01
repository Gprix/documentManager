import { TopButtonConfiguration } from "../ToolboxTopButton/ToolboxTopButton.types";

export const fileMenuOptions: TopButtonConfiguration[] = [
  { label: "Detalles", action: () => {} },
  { label: "Guardar", action: () => {} },
  { label: "Exportar", action: () => {} },
  { label: "Imprimir", action: () => {} },
];

export const editMenuOptions: TopButtonConfiguration[] = [
  { label: "Deshacer", action: () => {} },
  { label: "Rehacer", action: () => {} },
  { label: "Pegar", action: () => {} },
  { label: "Pegar nodo", action: () => {} },
  { label: "Pegar fila", action: () => {} },
  { label: "Buscar y reemplazar", action: () => {} },
];

export const viewMenuOptions: TopButtonConfiguration[] = [
  { label: "Modo", action: () => {} },
  { label: "Mostrar UI de nodos", action: () => {} },
  { label: "Mostrar marcas de comentarios en línea", action: () => {} },
  { label: "Mostrar marca-páginas de comentarios", action: () => {} },
];

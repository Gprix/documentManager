/**
 * Toolbox top button component props.
 *
 * @interface ToolboxTopButtonProps
 * @param {React.ReactNode} children - Button content.
 * @param {TopButtonConfiguration} buttonConfiguration - Button configuration.
 */
export interface ToolboxTopButtonProps {
  /** Button content. */
  children: React.ReactNode;
  /** Button configuration. */
  contextMenuConfiguration: TopButtonConfiguration[];
}

/**
 * Top button configuration.
 *
 * @interface TopButtonConfiguration
 * @param {string} label - Button label.
 * @param {() => void} action - Function to execute when the button is clicked.
 */
export interface TopButtonConfiguration {
  label: string;
  action: () => void;
}

import { Template } from "@/services/template/template.service.types";
/**
 * Document Actions component props.
 *
 * @param {string} className - Custom className.
 * @param {boolean} withNewAction - Whether to show the new action button.
 * @param {() => void} newAction - Function to execute when the new action button is clicked.
 */
export interface DocumentActionsProps {
  /** Custom className. */
  className?: string;
  /** Whether to show the new action button. */
  withNewAction?: boolean;
  /** Function to execute when the new action button is clicked. */
  newAction?: () => void;
  /** Label for the new action button. */
  newActionLabel?: string;
  templateList: Template[];
}

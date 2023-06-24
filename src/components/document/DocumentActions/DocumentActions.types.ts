import { Template } from "@/services/template/template.service.types";
/**
 * Document Actions component props.
 *
 * @param {string} className - Custom className.
 * @param {boolean} withNewAction - Whether to show the new action button.
 * @param {() => void} newAction - Function to execute when the new action button is clicked.
 * @param {Template[]} templateList - List of templates to render.
 * @param {string} mode - Select mode.
 * @param {boolean} isTemplate - Whether the actions are template-based.
 */
export interface DocumentActionsProps {
  /** Custom className. */
  className?: string;
  /** Whether to show the new action button. */
  withNewAction?: boolean;
  /** Label for the new action button. */
  newActionLabel?: string;
  /** ist of templates to render. */
  templateList: Template[];
  /** Select mode. */
  mode?: "new" | "open";
  /** Whether the actions are template-based. */
  isTemplate?: boolean;
}

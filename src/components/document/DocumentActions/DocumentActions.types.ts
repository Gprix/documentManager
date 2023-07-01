import { Template } from "@/services/template/template.service.types";
/**
 * Document Actions component props.
 *
 * @param {string} className - Custom className.
 * @param {boolean} withNewAction - Whether to show the new action button.
 * @param {string} newActionLabel - Label for the new action button.
 * @param {Template[]} templateList - List of templates to render.
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
  /** Whether the actions are template-based. */
  isTemplate?: boolean;
}

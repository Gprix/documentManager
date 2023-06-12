import { ProtocolTemplate } from "@/services/template/template.service.types";

/**
 * TemplateList component props.
 *
 * @param {string} className - Custom className.
 * @param {ProtocolTemplate[]} templates - List of templates.
 */
export interface TemplateListProps {
  /** Custom className. */
  className?: string;
  /** List of templates. */
  templates: ProtocolTemplate[];
}

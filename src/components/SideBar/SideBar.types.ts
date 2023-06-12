export interface SideBarProps {
  addPeekComponent?: (component: JSX.Element) => void;
  // TODO: should take id
  closePeekComponent?: () => void;
}

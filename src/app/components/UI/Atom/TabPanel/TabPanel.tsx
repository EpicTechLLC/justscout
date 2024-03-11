export type TabPanelProps = {
  /**React Element to display*/
  children?: React.ReactNode;
  /** Value of this TabPanel*/
  index: number;
  /** Current Value selected */
  value: number;
};
/** Displays children when value === index */
export default function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

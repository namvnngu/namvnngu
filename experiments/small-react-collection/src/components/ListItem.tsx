export function ListItem(props: {
  active?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}) {
  const className = props.active
    ? "block cursor-pointer rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
    : "block cursor-pointer rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700";
  return (
    <li className={className} onClick={props.onClick}>
      {props.children}
    </li>
  );
}

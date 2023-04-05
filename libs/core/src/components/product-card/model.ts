export type ProductCardProps = {
  name?: string;
  onClick?: () => void;
  price?: string;
  isLoading?: boolean;
  onRemove?: ()=>void;
  onAdd?: ()=>void;
  action?: boolean;
  thumb?: string;
};

import {
  Tooltip as BaseToolTip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ToolTip({ children, info }: { children?; info? }) {
  return (
    <TooltipProvider>
      <BaseToolTip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{info}</p>
        </TooltipContent>
      </BaseToolTip>
    </TooltipProvider>
  );
}

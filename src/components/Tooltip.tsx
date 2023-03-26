import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { TooltipProps } from "../types/props";

const Tooltip = (props: TooltipProps) => {
  const { children, text } = props;

  return (
    <>
      <RadixTooltip.Provider>
        <RadixTooltip.Root>
          <RadixTooltip.Trigger>{children}</RadixTooltip.Trigger>
          <RadixTooltip.Portal>
            <RadixTooltip.Content
              collisionPadding={{ left: 16, right: 16 }}
              sideOffset={4}
              className="max-w-xs rounded-lg bg-neutral-800 px-5 py-3 text-sm text-white shadow"
            >
              {text}
              <RadixTooltip.Arrow className="fill-neutral-800" />
            </RadixTooltip.Content>
          </RadixTooltip.Portal>
        </RadixTooltip.Root>
      </RadixTooltip.Provider>
    </>
  );
};

export default Tooltip;

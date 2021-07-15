
import { Tooltip, withStyles } from '@material-ui/core';
import React from 'react'

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: 'transparent',
    color: 'none',
  },
}))(Tooltip);

interface TooltipWithShortcutProps {
  description?: string,
  shortcut?: string,
  children: any,
  groupShortcut?: string,
  placement?: "bottom" | "left" | "right" | "top" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | "right-end" | "right-start" | "top-end" | "top-start" | undefined
}
function TooltipWithShortcut({ description, groupShortcut, shortcut, children, placement }: TooltipWithShortcutProps) {

  if (description === undefined) {
    return <>
      {children}
    </>
  }

  return (
    <HtmlTooltip title={
      <div className="bg-gray-800 p-1 border rounded-md border-gray-700 px-2 text-xs text-gray-200">
          {description}
          {shortcut && <span className="text-xs text-gray-200"> ·&nbsp;
          {groupShortcut && <span><code className="bg-gray-700 inset-0 px-1 py-0.5 rounded-sm text-xs">G</code> then </span>}
          <code className="bg-gray-700 inset-0 px-1 py-0.5 rounded-sm text-xs">{shortcut}</code></span>}
      </div>
    } aria-label="add" enterDelay={500} placement={placement}>
      {children}
    </ HtmlTooltip>
  )
}

export default TooltipWithShortcut

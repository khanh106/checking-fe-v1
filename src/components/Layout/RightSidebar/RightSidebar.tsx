import Icon, { IconName } from "@/components/Icon/Icon"
import { Button } from "@/components/ui/button"
import { Flex } from "@/elements/Flex/Flex"

export default function RightSidebar() {
  const groups: { icon: IconName }[][] = [
    [
      { icon: "LauncherSettings24Regular" },
      {
        icon: "PersonCircle24Regular",
      },
      {
        icon: "Calendar28Regular",
      },
      {
        icon: "ChatMultiple32Regular",
      },
    ],
    [
      { icon: "QuestionCircle20Regular" },
      {
        icon: "Settings20Regular",
      },
      {
        icon: "DocumentOnePage20Regular",
      },
    ],
  ]

  return (
    <Flex direction="col" className="h-[calc(100svh-var(--header-height))]! w-[var(--right-sidebar-width)] py-4" justify="between" align="start">
      {groups.map((group, index) => (
        <Flex direction="col" className="gap-2.5" key={index}>
          {group.map((item, idx) => (
            <Button className="size-11" size="icon" variant="ghost" key={idx}>
              <Icon name={item.icon} className="size-6" />
            </Button>
          ))}
        </Flex>
      ))}
    </Flex>
  )
}

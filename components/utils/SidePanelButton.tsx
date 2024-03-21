'use client'
import { Tooltip, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

import { ReactElement } from "react";

interface SidePanelButtonProps {
  icon: ReactElement,
  label: string,
  href: string,
}

const SidePanelButton = ({ icon, label, href }: SidePanelButtonProps) => {

 const router = useRouter();

    return (
    <Tooltip label={label} placement="right">
      <Button
        onClick={() => router.push(href)}
        variant="ghost"
        zIndex="banner"
        position="relative"
        left="5px"
        size="sm"
        aria-label={label} // Accessibility improvement
      >
        {icon}
      </Button>
    </Tooltip>
    );
};

  export default SidePanelButton;
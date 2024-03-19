import { useRouter } from "next/router";
import { CreateAvatarIcon, CreateImageIcon, EditImageIcon, WriteScriptIcon } from "@/app/icons";
import { Button, Tooltip, VStack } from "@chakra-ui/react";

interface ToolbarButtonProps {
    icon: React.ReactElement;
    label: string;
    href: string;
}

const Toolbar = () => {

    const router = useRouter();
    const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, label, href }) => (
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

    return (
        <VStack
            bgImage="@/light_dots_pattern.png" bgRepeat="repeat"
            align="flex-start" position="fixed" left="0" top="200px" spacing={4}>
            <ToolbarButton icon={<CreateImageIcon />} label="Create Images" href="/dashboard/create-image" />
            <ToolbarButton icon={<EditImageIcon />} label="Edit Images" href="/dashboard/edit-image" />
            <ToolbarButton icon={<WriteScriptIcon />} label="Write Script" href="/dashboard/write-script" />
            <ToolbarButton icon={<CreateAvatarIcon />} label="Create Avatar" href="/dashboard/create-avatar" />
            {/* Additional buttons */}
        </VStack>
    )
}
export default Toolbar;
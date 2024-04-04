import { useRouter } from "next/router";
import { CreateAvatarIcon, CreateImageIcon, EditImageIcon, WriteScriptIcon } from "@/app/icons";
import { Spacer, Button, Tooltip, VStack } from "@chakra-ui/react";
import { Axis3dIcon, WandIcon } from "lucide-react";

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
            display="flex" justifyContent="space-between"
            align="flex-start" position="fixed" left="0" top="200px" spacing={4}>
            <ToolbarButton icon={<CreateImageIcon />} label="Create Images" href="/create-image" />
            <ToolbarButton icon={<EditImageIcon />} label="Edit Images" href="/edit-image" />
            <Spacer />
            <ToolbarButton icon={<CreateAvatarIcon />} label="Design Avatar" href="/create-avatar" />
            <ToolbarButton icon={<Axis3dIcon />} label="Train Model" href="/dashboard/AvatarTrainer" />
            <ToolbarButton icon={<WandIcon />} label="Generate Model Images" href="/AvatarGenerator" />
            <Spacer />
            <ToolbarButton icon={<WriteScriptIcon />} label="Write Script" href="/dashboard/write-script" />
        </VStack>
    )
}
export default Toolbar;
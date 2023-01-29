// Create footer with copyrigt text in senter
import {Text, HStack} from "@chakra-ui/react";

const Footer = () => {
    return (
        <footer className="footer">
            <HStack align={'center'} width={'full'} justify={'center'} paddingBottom={2}>
                <Text color={'gray'}>&copy; {new Date().getFullYear()} <span>LabZone</span>. All rights
                    reserved</Text>
            </HStack>
        </footer>
    );
};

export default Footer;
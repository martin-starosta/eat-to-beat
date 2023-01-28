import { ReactNode } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import Image from "next/image";

type NavLink = {
  path: string;
  text: string;
};
const Links: NavLink[] = [
  { path: "/plan", text: "Plans" },
  { path: "/recipes/create", text: "Recipes" },
];

const NavLink = ({ path, text }: { path: string; text: string }) => (
  <Link href={path}>
    <Text color={"white"}>{text}</Text>
  </Link>
);

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW="6xl">
        <Box px={4} zIndex={999} position={"absolute"}>
          <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
            <IconButton
              size={"md"}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={"Open Menu"}
              display={{ md: "none" }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <Link href="/">
                  <Image
                    src="/Logo-Part-White.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                  />
                </Link>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link: NavLink) => (
                  <NavLink key={link.path} path={link.path} text={link.text} />
                ))}
              </HStack>
            </HStack>
          </Flex>
        </Box>
      </Container>
    </>
  );
};

export default NavBar;

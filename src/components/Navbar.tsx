// Template from https://chakra-templates.dev/navigation/navbar

import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Image,
  Input,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { KeyboardEvent } from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/logo192.png"
        alt="brand logo"
        h={{ base: "30px", md: "20px", sm: "30px" }}
      />
    </Link>
  );
};

const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter") {
    window.open(`/search?q=${(e.target as HTMLInputElement).value}`);
  }
};

const Search = () => {
  return (
    <Input
      onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => handleSearch(e)}
      placeholder="Search by address, block, extrinsic"
    />
  );
};

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex
      padding={{ base: "2px", md: "10px" }}
      margin={{ base: "10px 2px 2px", md: "10px" }}
      flexDirection={{ base: "column", lg: "row" }}
      boxShadow="0 2px #ccc"
    >
      <Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "left" }} padding={"10px 0"}>
          {<Logo />}
        </Flex>
        <Flex
          flex={{ base: 1, md: "right" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          justifyContent="flex-end"
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
      </Flex>
      <Flex
        flex="auto"
        flexDirection="column"
        display={{ base: "none", md: "flex" }}
        justifyContent={{ md: "left", lg: "right" }}
      >
        <Flex
          justifyContent={{ md: "left", lg: "right" }}
          w={{ base: "100%", lg: "460px" }}
          alignSelf="flex-end"
        >
          <Search />
        </Flex>
        <Flex justifyContent={{ md: "left", lg: "right" }} mt="10px">
          <DesktopNav NAV_ITEMS={NAV_ITEMS} />
        </Flex>
      </Flex>
      <Box>
        <Box>
          <Collapse in={isOpen} animateOpacity>
            <MobileNav NAV_ITEMS={NAV_ITEMS} />
          </Collapse>
        </Box>
      </Box>
      <Box display={{ base: "block", md: "none" }} marginBottom="5px">
        <Search />
      </Box>
    </Flex>
  );
}

const DesktopNav = ({ NAV_ITEMS }: Props) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
                {navItem.children && <ChevronDownIcon marginLeft="5px" />}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ NAV_ITEMS }: Props) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

interface Props {
  NAV_ITEMS: Array<NavItem>;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Blocks",
    href: "/blocks",
  },
  {
    label: "Extrinsics",
    href: "/extrinsics",
  },
  {
    label: "Events",
    href: "/events",
  },
  {
    label: "Transfers",
    href: "/transfers",
  },
  {
    label: "Charts",
    href: "/charts",
  }
];

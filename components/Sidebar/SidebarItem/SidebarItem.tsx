import { ListIcon, ListItem, LinkBox, LinkOverlay } from "@chakra-ui/layout";
import Link from "next/link";
import { SidebarItemProps } from "./types";

const SidebarItem = ({ name, route, icon }: SidebarItemProps) => (
  <ListItem paddingX="20px" fontSize="16px" key={name}>
    <LinkBox>
      <Link href={route} passHref>
        <LinkOverlay>
          <ListIcon as={icon} color="white" marginRight="20px" />
          {name}
        </LinkOverlay>
      </Link>
    </LinkBox>
  </ListItem>
);

export default SidebarItem;

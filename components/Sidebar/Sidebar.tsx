import Image from "next/image";
import Link from "next/link";
import {
  Box,
  List,
  ListItem,
  Divider,
  Center,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import SidebarItem from "./SidebarItem/SidebarItem";
import { navMenu, musicMenu } from "./utils/menuItems";
import { usePlaylist } from "../../lib/hooks";

const Sidebar = () => {
  const { playlists } = usePlaylist();

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image src="/logo.png" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((item) => (
              <SidebarItem
                name={item.name}
                route={item.route}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>

        <Box marginTop="20px" marginBottom="20px">
          <List spacing={2}>
            {musicMenu.map((item) => (
              <SidebarItem
                name={item.name}
                route={item.route}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
        <Divider color="gray.800" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <List spacing={2}>
            {playlists &&
              playlists.map((playlist) => (
                <ListItem paddingX="20px" fontSize="16px" key={playlist.id}>
                  <LinkBox>
                    <Link href="/">
                      <LinkOverlay>{playlist.name}</LinkOverlay>
                    </Link>
                  </LinkBox>
                </ListItem>
              ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

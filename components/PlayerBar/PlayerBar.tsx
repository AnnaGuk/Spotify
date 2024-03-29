import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "../../lib/store";
import Player from "../Player/Player";

const PlayerBar = () => {
  const songs = useStoreState((state) => state.activeSongs);
  const activeSong = useStoreState((state) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      {activeSong && (
        <Flex alignItems="center">
          <Box padding="20px" color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
          <Box width="40%">
            <Player songs={songs} activeSong={activeSong} />
          </Box>
          <Box width="30%">volume</Box>
        </Flex>
      )}
    </Box>
  );
};

export default PlayerBar;

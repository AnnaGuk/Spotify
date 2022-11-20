import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Th, Tbody, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useStoreActions } from "../../lib/store";
import { formatDate, formatTime } from "../../lib/formatters";
import { SongsTableProps } from "./types";
import { SongWithArtist } from "../../lib/types";

const SongsTable = ({ songs }: SongsTableProps) => {
  const playSongs = useStoreActions((store) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store) => store.changeActiveSong);

  const handlePlay = (activeSong?: SongWithArtist): void => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };
  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            colorScheme="green"
            size="lg"
            isRound
            aria-label="play"
            onClick={() => handlePlay()}
          />
        </Box>

        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s ",
                  "&:hover": {
                    bg: "rgba(255,255,255, 0.1)",
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt.toString())}</Td>
                <Td>{formatTime(song.duration)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;

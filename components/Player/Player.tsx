import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "../../lib/store";
import { formatTime } from "../../lib/formatters";
import { PlayerProps } from "./types";

const Player = ({ songs, activeSong }: PlayerProps) => {
  const [playing, setPlaying] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(
    songs.findIndex((s) => s.id === activeSong.id)
  );
  const [seek, setSeek] = useState<number>(0.0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [repeat, setRepeat] = useState<boolean>(false);
  const [shuffle, setShuffle] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);
  const setActiveSong = useStoreActions((state) => state.changeActiveSong);

  useEffect(() => {
    let timerId: number;

    if (playing && !isSeeking) {
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(timerId);
    }

    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  const setPlayState = (value: boolean): void => setPlaying(value);

  const onShuffle = (): void => setShuffle((state) => !state);

  const onRepeat = (): void => setRepeat((state) => !state);

  const prevSong = (): void => {
    setIndex((state) => {
      return state ? state - 1 : songs.length - 1;
    });
  };

  const nextSong = (): void => {
    setIndex((state) => {
      if (shuffle) {
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          nextSong();
        }
        return next;
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  const onEnd = (): void => {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
    } else {
      nextSong();
    }
  };

  const onLoad = (): void => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  const onSeek = (e: number[]): void => {
    setSeek(e[0]);
    soundRef.current.seek(e[0]);
  };

  return (
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            color={shuffle ? "white" : "gray.600"}
            icon={<MdShuffle />}
            onClick={onShuffle}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={prevSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            color={repeat ? "white" : "gray.600"}
            onClick={onRepeat}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              id="player-range"
              max={duration ? (duration.toFixed(2) as unknown as number) : 0}
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%">
            <Text fontSize="xs" textAlign="right">
              {formatTime(duration)}
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;

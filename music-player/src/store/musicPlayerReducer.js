import img1 from "../images/music-1.jpg";
import img2 from "../images/music-2.jpg";
import img3 from "../images/music-3.jpg";
import img4 from "../images/music-4.jpg";
import img5 from "../images/music-5.jpg";
import music1 from "../music/music-1.mp3";
import music2 from "../music/music-2.mp3";
import music3 from "../music/music-3.mp3";
import music4 from "../music/music-4.mp3";
import music5 from "../music/music-5.mp3";

const playList = [
  {
    name: "Relax And Sleep",
    artist: "Anton Vlasov",
    img: img1,
    src: music1,
    id: 1,
  },
  {
    name: "Don't You Think Lose",
    artist: "Anton Vlasov",
    img: img2,
    src: music2,
    id: 2,
  },
  {
    name: "The Cradle of Your Soul",
    artist: "lemonmusicstudio",
    img: img3,
    src: music3,
    id: 3,
  },
  {
    name: "Spirit Blossom",
    artist: "RomanBelov",
    img: img4,
    src: music4,
    id: 4,
  },
  {
    name: "Everything Feels New",
    artist: "EvgenyBardyuzha",
    img: img5,
    src: music5,
    id: 5,
  },
];

const repeatState = ["ALL", "SUFFLE", "ONE"];

const initialState = {
  playList,
  currentMusicId: playList[0].id,
  currentIndex: 0,
  playing: false,
  repeat: "ALL",
};

const getRandomIndex = (playList, currentIndex) => {
  const length = playList.length;
  const randomIndex = Math.floor(Math.random() * length);
  return randomIndex === currentIndex
    ? getRandomIndex(playList, currentIndex)
    : randomIndex;
};

const PLAY_MUSIC = "musicPlayer/PLAY_MUSIC";
const STOP_MUSIC = "musicPlayer/STOP_MUSIC";
const NEXT_MUSIC = "musicPlayer/NEXT_MUSIC";
const PREV_MUSIC = "musicPlayer/PREV_MUSIC";
const SET_REPEAT = "musicPlayer/SET_REPEAT";
const SET_CURRENT_MUSIC = "musicPlayer/SET_CURRENT_MUSIC";
const SET_NEW_LIST = "musicPlayer/SET_NEW_LIST";

export const playMusic = () => ({ type: PLAY_MUSIC });
export const stopMusic = () => ({ type: STOP_MUSIC });
export const nextMusic = () => ({ type: NEXT_MUSIC });
export const prevMusic = () => ({ type: PREV_MUSIC });
export const setRepeat = () => ({ type: SET_REPEAT });
export const setCurrentMusic = (index) => ({ type: SET_CURRENT_MUSIC, index });
export const setNewList = (newList) => ({ type: SET_NEW_LIST, newList });

export default function musicPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case PLAY_MUSIC:
      return {
        ...state,
        playing: true,
      };
    case STOP_MUSIC:
      return {
        ...state,
        playing: false,
      };
    case NEXT_MUSIC:
      const nextIndex =
        state.repeat === "ALL"
          ? (state.currentIndex + 1) % state.playList.length
          : getRandomIndex(playList, state.currentIndex);
      return {
        ...state,
        currentIndex: nextIndex,
        currentMusicId: playList[nextIndex].id,
      };
    case PREV_MUSIC:
      const prevIndex =
        (state.currentIndex - 1 + state.playList.length) %
        state.playList.length;
      return {
        ...state,
        currentIndex: prevIndex,
        currentMusicId: playList[prevIndex].id,
      };
    case SET_REPEAT:
      return {
        ...state,
        repeat:
          repeatState[
            (repeatState.indexOf(state.repeat) + 1) % repeatState.length
          ],
      };
    case SET_CURRENT_MUSIC:
      return {
        ...state,
        currentIndex: action.index,
        currentMusicId: playList[action.index].id,
      };
    case SET_NEW_LIST:
      return {
        ...state,
        playList: action.newList,
        currentIndex: action.newList.findIndex(
          (music) => music.id === state.currentMusicId
        ),
        
      };
    default:
      return state;
  }
}

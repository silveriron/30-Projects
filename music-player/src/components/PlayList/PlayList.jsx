import React from "react";
import QueueMusic from "@mui/icons-material/QueueMusic";
import Close from "@mui/icons-material/Close";
import SortableList from "@kichul7493/sortable-list";
import PlayListItem from "./PlayListItem";
import "./PlayList.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentMusic, setNewList } from "../../store/musicPlayerReducer";

const PlayList = ({ isShowPlayList, setIsShowPlayList }) => {
  const { playList } = useSelector((state) => state);
  const dispatch = useDispatch();
  const onClickClosePlayList = () => {
    setIsShowPlayList(false);
  };

  const onClickCurrentMusic = (index) => {
    dispatch(setCurrentMusic(index));
  };

  const renderPlayList = (item, index) => {
    return <PlayListItem item={item} index={index} />;
  };

  const onDropMusic = (newList) => {
    dispatch(setNewList(newList));
  };

  return (
    <div className={`play-list ${isShowPlayList ? "show" : ""}`}>
      <div className="header">
        <div className="row">
          <QueueMusic className="list" />
          <span>Play list</span>
        </div>
        <Close
          sx={{ fontSize: 22, cursor: "pointer" }}
          onClick={onClickClosePlayList}
        />
      </div>
      <SortableList
        data={playList}
        onClickItem={onClickCurrentMusic}
        onDropItem={onDropMusic}
        renderItem={renderPlayList}
      />
    </div>
  );
};

export default PlayList;

import { observer } from "mobx-react";
import React, { useCallback } from "react";
import Memo from "./Memo/Memo.jsx";
import AddIcon from "@mui/icons-material/Add";

const App = ({ store }) => {
  const addMemo = useCallback(() => {
    store.addMemo();
  }, [store]);

  const editMemo = useCallback(
    (id, content) => {
      store.editMemo(id, content);
    },
    [store]
  );

  const SetWidthHeight = useCallback(
    (id, width, height) => {
      store.SetWidthHeight(id, width, height);
    },
    [store]
  );

  const SetPosition = useCallback(
    (id, x, y) => {
      store.setPosition(id, x, y);
    },
    [store]
  );

  const Delete = useCallback((id) => store.removeMemo(id), [store]);

  console.log(store.memos);
  return (
    <>
      {store.memos.map((memo) => (
        <Memo
          key={memo.id}
          item={memo}
          Edit={editMemo}
          SetWidthHeight={SetWidthHeight}
          SetPosition={SetPosition}
          Delete={Delete}
        />
      ))}
      <AddIcon sx={{ float: "right", fontSize: "32px" }} onClick={addMemo} />
    </>
  );
};

export default observer(App);

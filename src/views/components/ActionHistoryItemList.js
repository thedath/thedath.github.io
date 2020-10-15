import React from "react";
import usePost from "../../redux/hooks/usePost";
import ActionHistoryItem from "./ActionHistoryItem";

const ActionHistoryItemList = () => {
  const { postHistory } = usePost();
  return (
    <div>
      {postHistory.map((history, index) => (
        <ActionHistoryItem
          key={`history-key-${index}`}
          index={index}
          {...history}
        />
      ))}
    </div>
  );
};

export default ActionHistoryItemList;

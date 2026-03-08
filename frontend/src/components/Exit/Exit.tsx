import { type FC } from "react";
import api from "../../api";
import { useGetLists, useGetQueue } from "../../api/hooks";
import { EnterQueueBtn } from "../EnterQueueButton/index";
import { PeopleList } from "../PeopleList/index";

export const Exit: FC = () => {
  const {peopleOutside, setPeopleOutside} = useGetLists();
  const {waitingQueue, setWaitingQueue} =  useGetQueue();


  
  const userName = localStorage.getItem("name") || "Unknown User";
  const userId = Number(localStorage.getItem("id")) || 0;

  const MAX_OUTSIDE = 5;

  const isDisabled = !waitingQueue
    .slice(0, MAX_OUTSIDE - peopleOutside.length)
    .includes(userName)
    ? waitingQueue.includes(userName)
    : false;

  const leaveWaitingQueue = (name: string, userId: number) => {
    api
    .queue()
    .exitQueue(userId)
    .then(() => {
        setWaitingQueue((prevQueue) =>prevQueue.filter((person) => person !== name));
      })
      .catch((error) => {
        alert("Error leaving the queue:" + error.message);
      });
  };

  const returnInside = (name: string, userId: number) => {
    api
    .list()
    .exitList(userId)
    .then(() => {
        setPeopleOutside((prevQueue) => prevQueue.filter((person) => person !== name));
      })
      .catch((error) => {
        alert("Error leaving the list:" + error.message);
      });
  };

  const joinWaitingQueue = (name: string, userId: number) => {
    api
    .queue()
    .enterQueue(userId)  
    .then(() => {
        setWaitingQueue((prevQueue) => [...prevQueue, name]);
      })
      .catch((error) => {
        alert("Error joining the waiting queue:" + error.message);
      });
  };

  const goOutside = (name: string, userId: number) => {
    api
    .list()
    .enterList(userId, name)
    .then(() => {
        setPeopleOutside((prevQueue) => [...prevQueue, name]);
      })
      .catch((error) => {
        alert("Error joining the list:" + error.message);
      });
  };

  const changeQueue = (name: string, userId: number) => {
    leaveWaitingQueue(name, userId);
    goOutside(name, userId);
  };

  const handleMainBtnClick = peopleOutside.includes(userName)
    ? returnInside
    : ![...waitingQueue]
          .splice(0, MAX_OUTSIDE - peopleOutside.length)
          .includes(userName)
      ? !(peopleOutside.length + waitingQueue.length > MAX_OUTSIDE)
        ?  goOutside
        : joinWaitingQueue
      : changeQueue;

  const handleExitWaitingQueue = leaveWaitingQueue;

  return (
    <div
      className="exit "
      style={{ maxHeight: "90vh" }}
    >
      <div className="container d-flex flex-column align-items-center justify-content-center h-auto">
        <div className="outside-section">
          <h2>
            Currently Outside ({peopleOutside.length}/{MAX_OUTSIDE})
          </h2>
          <PeopleList
            className="shadow p-3 mb-2 bg-body rounded list-group"
            people={
             Array.isArray(peopleOutside) ?
                 [
                    ...peopleOutside,
                    ...Array(MAX_OUTSIDE - peopleOutside.length).fill(null),
                  ]: []
              
            }
          />
        </div>

        <div className="d-flex w-100 align-items-center justify-content-center my-4">
          <EnterQueueBtn
            className="btn btn-danger btn-lg"
            isDisabled={isDisabled}
            handleMainBtnClick={() => handleMainBtnClick(userName, userId)}
            message={"go outside"}
          />
        </div>

        <div className="waiting-section">
          <h2>Waiting Queue</h2>

          <div
            className="d-flex
              align-items-center
              justify-content-end
              mb-2"
          >
            <EnterQueueBtn
              className="btn btn-secondary btn-sm"
              isDisabled={!waitingQueue.includes(userName)}
              handleMainBtnClick={() =>
                handleExitWaitingQueue(userName, userId)
              }
              message="stop waiting"
            />
          </div>
        </div>

        <div
          className="shadow p-2 mb-2 bg-body rounded w-100"
          style={{ maxHeight: "250px", overflowY: "auto" }}
        >
          <PeopleList
            className="list-group"
            people={[...waitingQueue]}
          />
        </div>
      </div>
    </div>
  );
};

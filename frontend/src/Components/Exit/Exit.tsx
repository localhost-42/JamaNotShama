import React, { useState, type FC } from 'react';
import { EnterQueueBtn } from '../EnterQueueButton/EnterQueueBtn';
import { PeopleList } from '../PeopleList/PeopleList';

export const Exit: FC = () => {
  const [peopleOutside, setPeopleOutside] = useState<string[]>([ 'Sarah', 'name', 'name2', 'Mike']);
  const [waitingQueue, setWaitingQueue] = useState<string[]>(['guy', 'Alice', 'Bob', 'generic student']);

  const userName = localStorage.getItem('name') || 'Unknown User';
  const MAX_OUTSIDE = 5;

  const isDisabled = !waitingQueue.slice(0, MAX_OUTSIDE - peopleOutside.length)
                      .includes(userName) ? waitingQueue.includes(userName) : false


  const leaveQueue = 
    (setQueue: React.Dispatch<React.SetStateAction<string[]>>) =>
     (name: string) => {
        console.log('left');
        

        setQueue((prevQueue) => prevQueue.filter((person) => person !== name));
     }


    const joinQueue = 
     (setQueue: React.Dispatch<React.SetStateAction<string[]>>) =>
     (name: string) => {
        console.log('joined');
        
        setQueue((prevQueue) => [...prevQueue, name]);
     }

     const changeQueue = (name: string) => {  
        console.log('change');
        

          leaveQueue(setWaitingQueue)(name);
            joinQueue(setPeopleOutside)(name);
     }

    const handleMainBtnClick =
           peopleOutside.includes(userName) ?
             leaveQueue(setPeopleOutside): 
             (![...waitingQueue].splice(0, MAX_OUTSIDE - peopleOutside.length)
             .includes(userName) ? 
             (!(peopleOutside.length + waitingQueue.length > MAX_OUTSIDE) ? 
             joinQueue(setPeopleOutside) : joinQueue(setWaitingQueue)) :
              changeQueue);
   
            const handleExitWaitingQueue =  leaveQueue(setWaitingQueue);
            

  return (
    <div className="exit position-fixed end-0 top-50 translate-middle-y" style={{ maxHeight: '90vh' }}>
      <div className="container d-flex flex-column align-items-center justify-content-center h-auto">
        <div className="outside-section">
          <h2>Currently Outside ({peopleOutside.length}/{MAX_OUTSIDE})</h2>
          <PeopleList
          className='shadow p-3 mb-2 bg-body rounded list-group'
           people={
            [...peopleOutside, ...Array(MAX_OUTSIDE - peopleOutside.length).fill(null)]} />
        </div>

          <div className="d-flex w-100 align-items-center justify-content-center my-4">
            <EnterQueueBtn 
            className='btn btn-danger btn-lg'
            isDisabled={isDisabled}
            userName={userName}
            handleMainBtnClick={handleMainBtnClick} 
            message={isDisabled ? "Queue is full" : "Join Queue"} />
          </div>

        <div className="waiting-section">
            <h2>Waiting Queue</h2>
            
             <div className="d-flex
              align-items-center
              justify-content-end
              mb-2">
            
            <EnterQueueBtn
            className='btn btn-secondary btn-sm align-self-end'
            isDisabled={!waitingQueue.includes(userName)}
            userName={userName}
            handleMainBtnClick={handleExitWaitingQueue}
            message="stop waiting" />
            </div>
        </div>
        
          <div className="shadow p-2 mb-2 bg-body rounded w-100"
               style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <PeopleList
              className="list-group"
              people={waitingQueue} />
          </div>
          

      </div>
    </div>
  );
}
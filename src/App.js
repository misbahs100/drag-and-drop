import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

const DATA = [
  {
    id: "Advisor-0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Advisor",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "Habibur Rahman" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Najmul Hossain" },
    ],
    tint: 1,
  },
  {
    id: "Teacher-487f68b4-1746-438c-920e-d67b7df46247",
    name: "CSE",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae", name: "Prof. Azim",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Ashraf Kazi" },
    ],
    tint: 2,
  },
  {
    id: "IT-25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "EEE",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Abu Bakar" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Md. Belal " },
    ],
    tint: 3,
  },
];
// const newItem = { id: "n983483cf-89a0-4d79-aa8e-56abbc15eacc", name: "New guy" }

function App() {
  const [stores, setStores] = useState(DATA);

  const handleDragAndDrop = (results) => {
    const { source, destination, type } = results;
    console.log(results)
    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedStores = [...stores];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return setStores(reorderedStores);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = stores.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = stores.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...stores[storeSourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...stores[storeDestinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...stores];

    newStores[storeSourceIndex] = {
      ...stores[storeSourceIndex],
      items: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...stores[storeDestinationIndex],
      items: newDestinationItems,
    };

    console.log("old store:", stores);
    console.log("new store:", newStores);
    // adding a new item
    // newStores.map(store => store.name==='IT'?store.items.push(newItem):'')
    setStores(newStores);

  };

  return (
    <div className="layout__wrapper">
      <div className="card">
        
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <div className="header">
            <h1>Teachers' List</h1>
          </div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div className="teachers" {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    index={index}
                    key={store.id}
                  >
                    {(provided) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <StoreList {...store} />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

     <div className="low-text">
     <h2 >Drag n Drop</h2>
     <p>Enjoy dragging anything, anywhere on the top</p>
     </div>
    </div>
  );
}

function StoreList({ name, items, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store-container">
            <h3>{name}</h3>
          </div>
          <div className="items-container">
            {items.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className="item-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <h4>{item.name}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}

export default App;

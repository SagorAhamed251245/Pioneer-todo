import Image from "next/image";
import React from "react";

const TodosBody = () => {
  const todos = [];
  return (
    <div className="flex-1 bg-white mt-8 rounded-lg flex flex-col">
      <div className="flex-1 flex justify-center items-center flex-col">
        <Image
          src={"/icon-no projects.png"}
          height={216}
          width={240}
          alt="icon-no projects.png"
        />
        <p>No todos yet</p>
      </div>
    </div>
  );
};

export default TodosBody;

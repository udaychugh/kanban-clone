import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shuffle } from "lodash";
import { Switch } from "@headlessui/react";
import boardIcon from "../assets/icon-board.svg";
import useDarkMode from "../hooks/useDarkMode";
import darkIcon from "../assets/icon-dark-theme.svg";
import lightIcon from "../assets/icon-light-theme.svg";
import '../style.css';
import showSidebarIcon from "../assets/icon-show-sidebar.svg";
import hideSidebarIcon from "../assets/icon-hide-sidebar.svg";
import addSquare from "../assets/add-square.png";
import boardsSlice from "../redux/boardsSlice";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import dots from "../assets/dots.png";
import home from "../assets/category.png"
import task from "../assets/task-square.png"
import settins from "../assets/setting-2.png"
import profile2 from "../assets/profile-2user.png"
import msg from "../assets/message.png"
import grp from "../assets/grp.png"

function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const dispatch = useDispatch();
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const colors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-pink-500",
    "bg-sky-500",
  ];

  const [color, setColor] = useState(null)
  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [dispatch]);

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const boards = useSelector((state) => state.boards);

  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };

  return (
    <div>
      <div
        className={
          isSideBarOpen
            ? `min-w-[261px] bg-white dark:bg-[#2b2c37]  fixed top-[72px] h-screen  items-center left-0 z-20`
            : ` bg-[#635FC7] dark:bg-[#2b2c37] dark:hover:bg-[#635FC7] top-auto bottom-10 justify-center items-center hover:opacity-80 cursor-pointer  p-0 transition duration-300 transform fixed felx w-[56px] h-[48px] rounded-r-full`
        }
      >
        <div>
          {/* reWrite modal  */}

          {isSideBarOpen && (
            <div className=" bg-white  dark:bg-[#2b2c37]    w-full   py-4 rounded-xl anothermanual">
              <div className="settings manualCSS">
                <span className="flex flex-row"><img src={home} alt="Icon" /><h3>Home</h3></span>
                <span className="flex flex-row"><img src={msg} alt="Icon" /><h3>Messages</h3></span>
                <span className="flex flex-row"><img src={task} alt="Icon" /><h3>Tasks</h3></span>
                <span className="flex flex-row"><img src={profile2} alt="Icon" /><h3>Members</h3></span>
                <span className="flex flex-row"><img src={settins} alt="Icon" /><h3>settings</h3></span>
              </div>
              <hr className="mb-8 mt-8"></hr>
              <div className="givingthemflex">
                <h3 className=" dark:text-gray-300 text-gray-600 font-semibold mx-4 mb-8 ">
                  My Projects ({boards?.length})
                </h3>
                <img src={addSquare} onClick={() => {
              setIsBoardModalOpen(true);
            }} alt="add icon" />
              </div>

              <div className="  dropdown-borad flex flex-col h-[70vh]  justify-between ">
                <div>
                  {boards.map((board, index) => (
                    <div
                      className={`flex items-baseline space-x-2 ml-4 px-5 mr-8 mb-4 duration-500 ease-in-out py-4 cursor-pointer text-[#787486] hover:bg-[#635fc71a] dark:hover:bg-white dark:hover:text-[#635fc7] dark:text-white  ${
                        board.isActive &&
                        " bg-[#635fc71a] text-[#0D062D] rounded-lg mr-8 "
                      } `}
                      key={index}
                      onClick={() => {
                        dispatch(boardsSlice.actions.setBoardActive({ index }));
                      }}
                    >
                      <div className={`addcircle ${color}`}></div>{" "}
                      <p className=" text-lg font-bold ">{board.name}</p>
                      {/* <img src={dots} alt="more option" className={`hidden` ${board.isActive && "b"} } /> */}
                      
                    </div>
                  ))}

                </div>
                
              </div>

              <img src={grp} className="addingsize" alt="write a message" />
            </div>
            
          )}

          
        </div>
      </div>

      {isBoardModalOpen && (
        <AddEditBoardModal
          type="add"
          setIsBoardModalOpen={setIsBoardModalOpen}
        />
      )}
    </div>
  );
}

export default Sidebar;

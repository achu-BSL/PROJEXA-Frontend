import { FC } from "react";
import { SideBar } from "./sidebar/sidebar";
import styles from "../style";
import { Outlet } from "react-router-dom";
import { NavBar } from "./navbar/NavBar";
import { useSidebarStore } from "@/store/useSidebarStore";

export const ProjectLayout: FC = () => {
  const isSideBarOpen = useSidebarStore((state) => state.isSidebarOpen);
  return (
    <>
      {!isSideBarOpen && <NavBar />}

      <div
        className={`${styles.flexCenter} bg-light_mode_secondary dark:bg-hash_dark_two`}
      >
        <div
          className={`flex ${styles.boxWidth} gap-5 sm:px-16 px-2 sm:py-10 `}
        >
          <div
            className={`${
              isSideBarOpen ? "scale-100" : "hidden"
            } fixed sm:relative transition-transform delay-50 origin-top-left duration-1000 ease-out left-0
            z-[9999999]`}
          >
            <SideBar />
          </div>
          <main
            className={`relative flex-1 mx-auto py-4 bg-light_mode_tertiary   dark:bg-hash_dark_two ring-1 ring-white/40 w-full rounded-md min-h-screen h-full`}
          >
            <div className="absolute bg-purple-400/30 rounded-full w-[20vw] h-[20vw] top-40 left-[50%] transform translate-x-[-50%] filter blur-2xl opacity-40"></div>
            <div className="absolute bg-purple-400/30 rounded-full w-[16vw] h-[16vw] left-10 top-[50%] transform -translate-y-[-50%] filter blur-2xl opacity-40"></div>
            <div className="absolute bg-purple-400/30 rounded-full w-[16vw] h-[16vw] top-[2%] right-[6%] filter blur-2xl opacity-40"></div>

            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

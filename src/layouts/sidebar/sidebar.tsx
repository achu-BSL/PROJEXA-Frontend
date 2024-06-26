import { FC } from "react";
import { FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { MdMenuOpen } from "react-icons/md";
import { TbUsersPlus } from "react-icons/tb";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";
import { useSidebarStore } from "@/store/useSidebarStore";
import { useUserStore } from "@/store/useUserStore";

export const SideBar: FC = () => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const updateUser = useUserStore((state) => state.updateUser);
  const user_name = useUserStore((state) => state.user?.user_name);
  return (
    <div className="flex w-[100vw] sm:w-full">
      <div
        className={`min-h-screen h-full  w-[200px] sm:w-[260px] m-0 lg:block felx flex-col text-light_mode_text dark:text-white bg-light_mode_hard dark:bg-white/10 backdrop-blur-sm rounded-s-md sm:rounded-lg transition-all duration-300`}
      >
        <MdMenuOpen
          onClick={() => toggleSidebar(false)}
          className=" absolute top-[50%] right-[-12px] translate-y-[-50%] cursor-pointer rotate-90"
          size="28"
        />
        <div className="flex-1 h-full flex flex-col justify-between gap-2 px-[10px] sm:px-[16px] sm:py-[12px]">
          <Link to="/">
            <h1 className="cursor-pointer font-semibold font-poppins text-center text-xl sm:text-2xl my-2 sm:my-5">
              PROJEXA
            </h1>
          </Link>
          <div className="flex-1 flex flex-col w-full">
            <Link to="/project/personal">
              <SideBarItem title="Personal Project" />
            </Link>
            <SideBarSubItemWrapper indexPath="/project/personal">
              <Link to="/project/personal/new">
                <SideBarSubItem
                  title="New Project"
                  icon={<AiOutlineAppstoreAdd />}
                />
              </Link>
            </SideBarSubItemWrapper>
            <Link to="/team">
              <SideBarItem title="Team" />
            </Link>
            <SideBarSubItemWrapper indexPath="/team">
              <Link to="/team/initiate-team">
                <SideBarSubItem title="Initiate Team" icon={<TbUsersPlus />} />
              </Link>
            </SideBarSubItemWrapper>
            {/* <SideBarItem title="Company Project" />
          <SideBarSubItemWrapper indexPath="/project/company">
            <SideBarSubItem
              title="New Project"
              icon={<AiOutlineAppstoreAdd />}
            />
          </SideBarSubItemWrapper> */}
            <Link to="/connections">
              <SideBarItem title="Connections" />
            </Link>
          </div>
          <div className="flex flex-col">
            <Link to={`/${user_name}`}>
              <SideBarItem title="Profile" icon={<FiUser size="18" />} />
            </Link>
            <Link to="/user/settings">
              <SideBarItem title="Settings" icon={<FiSettings size="18" />} />
            </Link>
            <button onClick={() => updateUser(null)} className="w-full">
              <SideBarItem title="Logout" icon={<FiLogOut size="18" />} />
            </button>
          </div>
        </div>
      </div>

      <div onClick={() => toggleSidebar(false)} className="flex-1 "></div>
    </div>
  );
};

interface SideBarItemProps {
  icon?: React.ReactNode;
  title: string;
}

const SideBarItem: FC<SideBarItemProps> = ({ icon, title }) => (
  <div className="sidebar-item group">
    <div className="flex-1 flex justify-between items-center">
      <span className="font-nunito font-medium sm:font-bold text-[12px] sm:text-[13px]">
        {title}
      </span>
      {icon && icon}
    </div>
  </div>
);

interface SideBarSubItemContainerProps {
  indexPath: string;
  children: React.ReactNode;
}

const SideBarSubItemWrapper: FC<SideBarSubItemContainerProps> = ({
  indexPath,
  children,
}) => {
  const location = useLocation();
  return (
    <div
      className={`${
        location.pathname === indexPath ? "flex" : "hidden"
      } flex-col items-end w-full`}
    >
      <div className="w-[80%]">{children}</div>
    </div>
  );
};

const SideBarSubItem: FC<SideBarItemProps> = ({ icon, title }) => (
  <div className="sidebar-sub-item group">
    <div className="flex-1 flex justify-between items-center">
      <span className="font-nunito font-medium sm:font-bold text-[12px] sm:text-[13px]">
        {title}
      </span>
      {icon && icon}
    </div>
  </div>
);

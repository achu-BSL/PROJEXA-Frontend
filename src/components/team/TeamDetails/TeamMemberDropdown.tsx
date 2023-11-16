import { useTeamDetails } from "@hooks/team/useTeamDetails";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useParams } from "react-router-dom";

export type CurrentUserRoles = "team_lead" | "team_admin";
export type SelectedUserRoles = "team_admin" | "team_member";

interface TeamMemberDropdownProps {
  currentUserRole: CurrentUserRoles;
  selectedUserRole: SelectedUserRoles;
  user_id: string;
}

// currentuserRole = team_lead
// selectedUserRole = team_admin

// options => make a team lead
//            demote to member

// currentuserRole = team_lead
// selectedUserRole = team_member

// options => promote to admin

// currentuserRole = team_admin
// selectedUserRole = team_admin

// options => demote to member

// currentuserRole = team_admin
// selectedUserRole = team_member

// options => promote to member

export const TeamMemberDropdown: FC<TeamMemberDropdownProps> = ({
  user_id,
  currentUserRole,
  selectedUserRole,
}) => {
  console.log("user-id", user_id);
  console.log("current-user-role", currentUserRole);
  console.log("selected-user-role", selectedUserRole);

  const { team_id } = useParams();

  const { promotedToAdmin, demoteToMember } = useTeamDetails(team_id!);

  const promoteToAdminHanlder = async () => {
    promotedToAdmin.mutate(user_id);
  };

  const demoteToMemberHandler = async () => {
    demoteToMember.mutate(user_id);
  };

  return (
    <Dropdown
      classNames={{
        base: ["bg-hash_one", "text-white"],
      }}
    >
      <DropdownTrigger>
        <div className="cursor-pointer">
          <CiMenuKebab />
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions">
        {/* {currentUserRole === "team_lead" &&
        selectedUserRole === "team_admin" ? (
            // <DropdownItem>Make team lead</DropdownItem>
            <DropdownItem onClick={demoteToMemberHandler}>
              Demote to member
            </DropdownItem>
          
        ) : currentUserRole === "team_lead" &&
          selectedUserRole === "team_member" ? (
          <DropdownItem onClick={promoteToAdminHanlder}>
            Promote to admin
          </DropdownItem>
        ) : currentUserRole === "team_admin" &&
          selectedUserRole === "team_admin" ? (
          <DropdownItem onClick={demoteToMemberHandler}>
            Demote to member
          </DropdownItem>
        ) : currentUserRole === "team_admin" &&
          selectedUserRole === "team_member" ? (
          <DropdownItem onClick={promoteToAdminHanlder}>
            Promote to admin
          </DropdownItem>
        ) : (
          <></>
        )} */}

        {currentUserRole === "team_lead" &&
        selectedUserRole === "team_admin" ? (
          <DropdownItem>Make team lead</DropdownItem>
        ) : (
          <DropdownItem className="hidden"></DropdownItem>
        )}

        {(currentUserRole === "team_lead" ||
          currentUserRole === "team_admin") &&
        selectedUserRole === "team_member" ? (
          <DropdownItem onClick={promoteToAdminHanlder}>
            Promote to admin
          </DropdownItem>
        ) : (
          <DropdownItem className="hidden"></DropdownItem>
        )}

        {(currentUserRole === "team_lead" ||
          currentUserRole === "team_admin") &&
        selectedUserRole === "team_admin" ? (
          <DropdownItem onClick={demoteToMemberHandler}>
            Demote to member
          </DropdownItem>
        ) : (
          <DropdownItem className="hidden"></DropdownItem>
        )}
        {/* {(currentUserRole)} */}
      </DropdownMenu>
    </Dropdown>
  );
};

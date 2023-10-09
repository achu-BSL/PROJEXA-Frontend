import { FC, useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from "@nextui-org/react";

import { useZodForm } from "../../hooks/useZodForm";
import { projectSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";
import {
  PersonalNewProjectProps,
  ProjectFormInterface,
  ProjectReferencesInterface,
} from "../../interfaces/project/personal/newProject.interface";
import { ProjectReferenceForm } from "../../components/project/ProjectReferenceForm";
import { isAxiosError } from "axios";
import { postRequest } from "../../helper/api.helper";
import { API_POST_CREATE_NEW_PERSONAL_PROJECT } from "@/constants/api.url";

export const NewProject: FC<PersonalNewProjectProps | {}> = () => {
  const [projectReferences, setProjectReferences] = useState<
    ProjectReferencesInterface[]
  >([]);
  const [editIdx, setEditIdx] = useState<null | number>(null);

  const {
    handleSubmit: handle,
    register: reg,
    errors: err,
    reset,
  } = useZodForm<ProjectFormInterface>(projectSchema);

  useEffect(() => {
    console.log(err);
    if (err.project_name?.message) toast.error(err.project_name?.message);
    if (err.project_desc?.message) toast.error(err.project_desc?.message);
    if (err.project_start_date?.message)
      toast.error(err.project_start_date?.message);
    if (err.project_end_date?.message)
      toast.error(err.project_end_date.message);
  }, [err]);

  const submitHandler = async (data: ProjectFormInterface) => {
    try {
      await postRequest(API_POST_CREATE_NEW_PERSONAL_PROJECT, {
        ...data,
        project_reference: projectReferences,
      });
      toast.success("Project Created Successfully");

      reset();
      setProjectReferences([]);
    } catch (err) {
      let message = "OPPS Something wrong";
      if (isAxiosError(err)) {
        if (err.response?.status === 401) message = "Authentication failed";
        else message = err.response?.data.message || message;
      }

      toast.error(message);
    }
  };

  return (
    <div className="md:px-16 px-6 md:py-8 py-4 text-white rounded-xl">
      <h1 className="font-poppins sm:text-xl text-lg md:mb-6 mb-3 font-semibold">
        New Project
      </h1>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex-1 md:px-8 px-3 md:py-6 py-3 bg-hash_one rounded-lg ">
          <h3 className="font-poppins font-medium sm:text-lg mb-3">
            Project Reference
          </h3>

          <div className="md:px-6 px-3">
            <ul className="flex flex-wrap gap-2">
              {projectReferences.map((item, idx) => (
                <li key={idx}>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button className="text-md font-poppins ">
                        {item.title.length < 10
                          ? item.title
                          : item.title.slice(0, 10) + "..."}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Example with disabled actions">
                      <DropdownItem
                        onClick={() => window.open(item.link)}
                        key="copy"
                      >
                        Visit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          setEditIdx(idx);
                        }}
                        key="edit"
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        onClick={() =>
                          setProjectReferences((prev) =>
                            prev.filter((i) => i.title !== item.title)
                          )
                        }
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              ))}
            </ul>
          </div>
          <ProjectReferenceForm
            projectReferences={projectReferences}
            setProjectReferences={setProjectReferences}
            editIdx={editIdx}
            setEditIdx={setEditIdx}
          />
        </div>
        <div className="flex-1 bg-hash_one rounded-lg md:px-8 px-3 md:py-6 py-3">
          <form onSubmit={handle(submitHandler)}>
            <div className="flex flex-col gap-4">
              <h3 className="font-poppins font-medium md:text-lg mb-3">
                Project Details
              </h3>
              <div className="flex gap-4">
                <Input
                  {...reg("project_name")}
                  isRequired
                  variant="bordered"
                  label="Project Name"
                  labelPlacement="outside"
                  placeholder="Enter your Project Name"
                  size="md"
                  name="project_name"
                  color="secondary"
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
              </div>
              <div className="flex gap-4">
                <Input
                  {...reg("project_start_date")}
                  isRequired
                  type="date"
                  variant="bordered"
                  label="Start date"
                  placeholder="Start date"
                  size="md"
                  labelPlacement="outside"
                  name="project_start_date"
                  color="secondary"
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
                <Input
                  {...reg("project_end_date")}
                  isRequired
                  type="date"
                  variant="bordered"
                  label="End date"
                  placeholder="End date"
                  size="md"
                  labelPlacement="outside"
                  name="project_end_date"
                  color="secondary"
                  onChange={(e) => console.log(e.currentTarget.value)}
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
              </div>
              <div>
                <Textarea
                  isRequired
                  {...reg("project_desc")}
                  variant="bordered"
                  label="Description"
                  labelPlacement="outside"
                  placeholder="Enter Project Description."
                  color="secondary"
                  name="project_desc"
                  classNames={{
                    input: [
                      "placeholder:text-white placeholder:text-opacity-60",
                    ],
                  }}
                />
              </div>
              <Button
                type="submit"
                className="text-white bg-hash_two hover:bg-light_hash mb-4"
                variant="bordered"
              >
                Add project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

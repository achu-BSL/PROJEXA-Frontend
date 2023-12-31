import { FC, useEffect, useState } from "react";
import { useZodForm } from "../../hooks/useZodForm";
import { ProjectReferencesInterface } from "../../interfaces/project";
import { referenceSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";
import { Input } from "@nextui-org/react";
import { IoMdAddCircle, IoMdSave } from "react-icons/io";
import { MdCancel } from "react-icons/md";

interface ProjectReferenceFormProps {
  projectReferences: ProjectReferencesInterface[];
  setProjectReferences: React.Dispatch<
    React.SetStateAction<ProjectReferencesInterface[]>
  >;
  editIdx: number | null;
  setEditIdx: React.Dispatch<React.SetStateAction<null | number>>;
}

export const ProjectReferenceForm: FC<ProjectReferenceFormProps> = ({
  projectReferences,
  editIdx,
  setProjectReferences,
  setEditIdx,
}) => {
  const [formData, setFormData] = useState<ProjectReferencesInterface>({
    title: "",
    link: "",
  });

  const { handleSubmit, register, errors } =
    useZodForm<ProjectReferencesInterface>(referenceSchema);

  const cancelButtonHandler = () => {
    setFormData({
      title: "",
      link: "",
    });
    setEditIdx(null);
  };

  const editHandler = () => {
    if (
      projectReferences.find(
        (item, idx) => item.title === formData.title && idx !== editIdx
      )
    ) {
      toast.error("Title already used");
      return;
    }
    setProjectReferences((prev) =>
      prev.map((item, idx) => {
        if (idx === editIdx) {
          return formData;
        }
        return item;
      })
    );
    setEditIdx(null);
  };

  const addNewReferenceHandler = () => {
    if (projectReferences.find((item) => item.title === formData.title)) {
      toast.error("Title already used");
      return;
    }
    setProjectReferences((prev) => [...prev, formData]);
  };

  const formSubmitHandler = () => {
    if (projectReferences.length >= 5) {
      toast.error("Project references can't be more tha 5");
      return;
    }
    if (editIdx !== null) editHandler();
    else addNewReferenceHandler();
    setFormData({ title: "", link: "" });
  };

  const inpChangeHandler = ({
    currentTarget,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (errors.link?.message) toast.error(errors.link.message);
    if (errors.title?.message) toast.error(errors.title.message);
  }, [errors]);

  useEffect(() => {
    if (editIdx !== null) {
      const editFormData = projectReferences.find(
        (_item, idx) => idx == editIdx
      );
      if (editFormData == null) {
        setEditIdx(null);
      } else {
        setFormData(editFormData);
      }
    }
  }, [editIdx]);

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className="flex gap-2 w-full items-end i bg-dark_has ">
          <Input
            {...register("title")}
            value={formData.title}
            onChange={inpChangeHandler}
            variant="underlined"
            label="Title"
            placeholder="Reference title"
            size="lg"
            name="title"
            color="secondary"
            classNames={{
              input: [
                "dark:placeholder:text-white placeholder:text-opacity-60",
              ],
              label: ["text-light_mode_text", "dark:text-white"],
              inputWrapper: [
                "border-light_mode_text",
                "dark:border-light_hash",
              ],
            }}
          />
          <Input
            {...register("link")}
            value={formData.link}
            onChange={inpChangeHandler}
            variant="underlined"
            label="Link"
            placeholder="Reference Link"
            size="lg"
            name="link"
            color="secondary"
            classNames={{
              input: [
                "dark:placeholder:text-white placeholder:text-opacity-60",
              ],
              label: ["text-light_mode_text", "dark:text-white"],
              inputWrapper: [
                "border-light_mode_text",
                "dark:border-light_hash",
              ],
            }}
          />
          {editIdx !== null && (
            <button
              onClick={cancelButtonHandler}
              type="button"
              className="pb-1"
            >
              <MdCancel size="30" />
            </button>
          )}

          <button className="pb-1">
            {editIdx !== null ? (
              <IoMdSave size="30" />
            ) : (
              <IoMdAddCircle size="30" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

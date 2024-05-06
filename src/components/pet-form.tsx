"use client";

import { usePetContext } from "@/lib/hooks";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { addPet, editPet } from "@/actions/actions";
import PetFormBtn from "./pet-form-btn";
import { toast } from "sonner";

type PetFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function PetForm({
  actionType,
  onFormSubmission,
}: PetFormProps) {
  const { selectedPet } = usePetContext();

  return (
    <form
      action={async (formData) => {

        if (actionType === "add") {
          const error = await addPet(formData);
          if (error) {
            toast.warning(error.message)
            return;
          }
        } else if (actionType === "edit") { 
          const error = await editPet(selectedPet,formData);
          if (error) {
            toast.warning(error.message)
            return;
          }
        }
    

        onFormSubmission();
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={
              actionType === "edit" ? selectedPet?.name : ""
            }
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={
              actionType === "edit" ? selectedPet?.ownerName : ""
            }
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">ImageUrl</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={
              actionType === "edit" ? selectedPet?.imageUrl : ""
            }
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Age</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={
              actionType === "edit" ? selectedPet?.age : ""
            }
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={
              actionType === "edit" ? selectedPet?.notes : ""
            }
          />
        </div>
      </div>

      <PetFormBtn actionType={actionType} />
    </form>
  );
}

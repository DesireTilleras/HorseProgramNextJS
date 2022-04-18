import { useState } from "react";
import { StyledDatePicker } from "./Styled/StyledDatePicker";
import { StyledCostInput } from "./Styled/StyledCostInpu";
import { Button } from "./Button";

export const CostInput = ({ data }) => {
  const onSubmitForm = async (event) => {
    await registerCost(event).then(clearInputs(event));
  };
  const clearInputs = (event) => {
    event.preventDefault();
    event.target.reset();
  };

  const registerCost = async (event) => {
    event.preventDefault();

    console.log(event.target.itemId.value);

    const res = await fetch("/api/addCostDB", {
      body: JSON.stringify({
        costTitle: event.target.costTitle.value,
        cost: event.target.cost.value,
        itemId: event.target.itemId.value,
        itemDate: event.target.date.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const result = await res.json();
  };

  const [checked, setCheckBoxChecked] = useState(false);

  const onAddCategory = (value) => {
    setCheckBoxChecked(value);
  };

  return (
    <StyledCostInput>
      <div>
        <h1>Register a new cost!</h1>
      </div>
      <form onSubmit={onSubmitForm}>
        <div className="text-input-wrapper">
          <label htmlFor="costTitle">Title:</label>
          <input
            id="costTitle"
            name="costTitle"
            className="text-input"
            type="text"
            autoComplete="costTitle"
            required
          />
        </div>
        <div className="text-input-wrapper">
          <label htmlFor="cost">Cost:</label>
          <input
            id="cost"
            name="cost"
            className="text-input"
            type="number"
            autoComplete="cost"
            required
          />
        </div>

        {data.map((item) => {
          return (
            <div key={item._id} className="inputGroup">
              <label htmlFor="itemId">{item.name}</label>
              <input
                name="itemId"
                type="radio"
                value={item._id}
                checked={item.name === checked}
                onChange={() => onAddCategory(item.name)}
                className="checkbox-items"
              />
            </div>
          );
        })}

        <StyledDatePicker>
          <label htmlFor="date">Pick a date:</label>
          <input
            id="date"
            name="date"
            type="date"
            autoComplete="date"
            required
          />
        </StyledDatePicker>

        {/* <button type="submit">Register</button> */}
        <Button type="submit" value="Register" />
      </form>
    </StyledCostInput>
  );
};

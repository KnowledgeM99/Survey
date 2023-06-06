import React, { useState } from "react";
import axios from "axios";

function Survey() {
  const [ageRange, setAgeRange] = useState(null);
  const [gender, setGender] = useState("male");
  const [feedback, setFeedback] = useState("");
  const [checkboxes, setCheckboxes] = useState({
    option1: false,
    homeDelivery: false,
    option3: false,
    option4: false,
    option5: false,
  });
  const [dropdownValue, setDropdownValue] = useState("default");

  const handleOptionChange = (event) => {
    setAgeRange(event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setCheckboxes({
      ...checkboxes,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const answered = {
      ageRange,
      gender,
      checkboxes,
      feedback,
      dropdownValue,
    };

    axios
      .post("http://localhost:4000/app/feedback", answered)
      .then((response) => {
        console.log(response.data);
        setAgeRange(ageRange);
        setGender(gender);
        setFeedback("");
        setCheckboxes({
          option1: false,
          homeDelivery: false,
          option3: false,
          option4: false,
          option5: false,
        });
        setDropdownValue({
          dropdownValue,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 style={{ alignContent: "centers", color: "black" }}>
        Online Shopping Survey
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <h4>Select Your Age Range</h4>
            <br />
            <label>
              <input
                type="radio"
                id="age-range-< 18"
                value="< 18"
                checked={ageRange === "< 18"}
                onChange={handleOptionChange}
              />
              &lt;18{" "}
            </label>
            <label>
              <input
                type="radio"
                id="age-range-18-29"
                value="18-29"
                checked={ageRange === "18-29"}
                onChange={handleOptionChange}
              />
              18-29
            </label>
            <label>
              <input
                type="radio"
                id="age-range-30-39"
                value="30-39"
                checked={ageRange === "30-39"}
                onChange={handleOptionChange}
              />
              30-39
            </label>
            <label>
              <input
                type="radio"
                id="age-range-40-plus"
                value="40+"
                checked={ageRange === "40+"}
                onChange={handleOptionChange}
              />
              40+
            </label>
          </label>
        </div>
        <div>
          <label>
            {" "}
            <br />
            <h4>Your gender</h4>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={handleGenderChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={handleGenderChange}
            />
            Female
          </label>
        </div>
        <div>
          <br />
          <h4>
            Why do you prefer online shopping? (choose as many as applicable)
          </h4>
          <label>
            <input
              type="checkbox"
              name="option1"
              checked={checkboxes.option1}
              onChange={handleCheckboxChange}
            />
            Flexibility of Prices
          </label>
          <label>
            <input
              type="checkbox"
              name="homeDelivery"
              checked={checkboxes.homeDelivery}
              onChange={handleCheckboxChange}
            />
            Home Delivery
          </label>
          <label>
            <input
              type="checkbox"
              name="option3"
              checked={checkboxes.option3}
              onChange={handleCheckboxChange}
            />
            Wide Range of Choices
          </label>
          <label>
            <input
              type="checkbox"
              name="option4"
              checked={checkboxes.option4}
              onChange={handleCheckboxChange}
            />
            Can find Products Store Doesn't Have
          </label>
          <label>
            <input
              type="checkbox"
              name="option5"
              checked={checkboxes.option5}
              onChange={handleCheckboxChange}
            />
            Other
          </label>
        </div>
        <div>
          <br />
          <label>
            <h4 text-align="center">
              Which products you would like to see on our store?{" "}
            </h4>
            <select value={dropdownValue} onChange={handleDropdownChange}>
              <option value="default" disabled>
                Select an option
              </option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Jeans">Jeans</option>
              <option value="Shirts">Shirts</option>
              <option value="Shoes">Shoes</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            <br />
            <h5>
              Your suggestions and recommendations for us{" "}
              <p style={{ color: "red" }}>*</p>
            </h5>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              required
            />
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Survey;

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Circles } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";

import { handleSaveQuestion } from "./questionSlice";

export const NewQuestion = () => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");

  const onOptionOneChanged = (e) => setOptionOneText(e.target.value);
  const onOptionTwoChanged = (e) => setOptionTwoText(e.target.value);

  const currentAuthedUser = useSelector((state) => state.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Note:  update question slice of state by creating a new question
  const onSaveQuestionClicked = () => {
    if (optionOneText && optionTwoText) {
      //   update state
      dispatch(
        handleSaveQuestion({
          optionOneText,
          optionTwoText,
          author: currentAuthedUser.authedId,
        })
      );
      // clear input fields
      setOptionOneText("");
      setOptionTwoText("");

      navigate("/");
    }
  };

  return (
    <section>
      <form>
        <h3>Would You Rather?</h3>
        <label htmlFor="optionOneText">Option One:</label>
        <input
          type="text"
          id="optionOneText"
          name="optionOneText"
          value={optionOneText}
          onChange={onOptionOneChanged}
        />
        <label htmlFor="optionTwoText">Option Two:</label>
        <input
          id="optionTwoText"
          name="optionTwoText"
          value={optionTwoText}
          onChange={onOptionTwoChanged}
        />
        <button type="button" onClick={onSaveQuestionClicked}>
          Add a New Question
        </button>
      </form>
    </section>
  );
};

import React, { useContext, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import "./Compiler.scss";
import spinner from "../../assets/spinner.svg";
import { UserContext } from "../../UserContext";

const Compiler = ({ room_id }) => {
  const { user } = useContext(UserContext);
  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");
  const userTheme = "vs-dark";
  const fontSize = 20;
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };
  function compile() {
    setLoading(true);
    if (userCode === ``) {
      return;
    }
    axios
      .post(`https://codecompilerserver.herokuapp.com/compile`, {
        code: userCode,
        language: userLang,
        input: userInput,
      })
      .then((res) => {
        setUserOutput(res.data.output);
      })
      .then(() => {
        setLoading(false);
      });
  }
  function clearOutput() {
    setUserOutput("");
  }
  useEffect(() => {
    setUserCode(user.programs[0].code);
  }, [user]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log(userCode, user);
      const saveCode = async () => {
        const res = await fetch("http://localhost:5000/savecode", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            _id: user["_id"],
            code: userCode,
            language: userLang,
            room_id: room_id,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
      };
      saveCode();
    }, 250);
    return () => clearTimeout(timeout);
  }, [userCode]);

  return (
    <div className="main">
      <div className="left-container">
        <Editor
          options={options}
          height="calc(100vh - 50px)"
          width="100%"
          theme={userTheme}
          language={userLang}
          defaultLanguage="python"
          defaultValue="# Enter your code here"
          value={userCode}
          onChange={(value) => {
            setUserCode(value);
          }}
        />
        <button className="run-btn" onClick={() => compile()}>
          Run
        </button>
        <select
          className="lang-select"
          value={userLang}
          onChange={(e) => setUserLang(e.target.value)}
        >
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="c++">C++</option>
          <option value="javascript">Javascript</option>
        </select>
      </div>
      <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box">
          <textarea
            id="code-inp"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
        <h4>Output:</h4>
        {loading ? (
          <div className="spinner-box">
            <img src={spinner} alt="Loading..." />
          </div>
        ) : (
          <div className="output-box">
            <pre>{userOutput}</pre>
            <button
              onClick={() => {
                clearOutput();
              }}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compiler;
